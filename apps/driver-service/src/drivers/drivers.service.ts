import { BadRequestException, ConflictException, ForbiddenException, Inject, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { KAFKA_TOPICS, EVENT_TYPES, PLATFORM_TENANT_ID } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { OnboardDriverDto } from './dto/onboard-driver.dto';
import { assertValidManualShift } from './shift-rules';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { CreateOwnVehicleDto } from './dto/create-own-vehicle.dto';
import { SelfOnboardDto } from './dto/self-onboard.dto';

@Injectable()
export class DriversService {
    constructor(@Inject(TENANT_PRISMA) private readonly db: any) { }

    async onboard(dto: OnboardDriverDto, auth: { cookie?: string; authorization?: string } = {}) {
        await this.assertUserIsDriverInTenant(dto.userId, auth);
        const { userId, ...rest } = dto;
        return this.db.driver.create({ data: { id: userId, ...rest, licenseExpiry: new Date(dto.licenseExpiry) } });
    }

    async get(id: string) {
        const driver = await this.db.driver.findUnique({ where: { id } });
        if (!driver) throw new NotFoundException('Driver not found');
        return driver;
    }

    async setManualShift(driverId: string, target: string) {
        const driver = await this.get(driverId);

        // BUSY normally clears when the last delivery ends. This is the way out if it ever
        // doesn't (a lost event): allowed exactly when no accepted delivery is outstanding.
        if (driver.shiftStatus === 'BUSY') {
            const active = await this.db.assignmentOffer.count({ where: { driverId, status: 'ACCEPTED' } });
            if (active > 0) throw new BadRequestException('Finish your active deliveries first');
        }
        assertValidManualShift(driver.shiftStatus, target);
        if (target === 'AVAILABLE') await this.assertEligible(driverId);
        return this.applyShiftStatus(driverId, target);
    }

    async isVehicleEligible(driver: any, tx?: any): Promise<boolean> {
        if (!driver?.assignedVehicleId) return false;
        const dbClient = tx ?? this.db;
        const vehicle = await dbClient.vehicle.findUnique({ where: { id: driver.assignedVehicleId } });
        return !!vehicle && vehicle.maintenanceState === 'OPERATIONAL' && vehicle.insuranceValid;
    }

    // System-controlled transitions (accept -> BUSY, delivery done -> AVAILABLE)
    // and manual ones both funnel through here, so DriverStatusChanged is
    // published exactly once per actual change, from one place.
    async applyShiftStatus(driverId: string, status: string, externalTx?: any) {
        const execute = async (tx: any) => {
            const driver = await tx.driver.update({ where: { id: driverId }, data: { shiftStatus: status } });
            await this.publishStatusSnapshot(tx, driver);
            return driver;
        };

        if (externalTx) {
            return execute(externalTx);
        }
        return this.db.$transaction(execute);
    }

    // System transition after delivery finishes or fails: returns driver to AVAILABLE
    // if vehicle is still operational, or flips to OFFLINE if maintenance occurred.
    async completeDeliveryShift(driverId: string, externalTx?: any) {
        const execute = async (tx: any) => {
            const driver = await tx.driver.findUnique({ where: { id: driverId } });
            if (!driver) throw new NotFoundException('Driver not found');
            const eligible = await this.isVehicleEligible(driver, tx);
            const targetStatus = eligible ? 'AVAILABLE' : 'OFFLINE';
            return this.applyShiftStatus(driverId, targetStatus, tx);
        };

        if (externalTx) {
            return execute(externalTx);
        }
        return this.db.$transaction(execute);
    }

    async updateLocation(driverId: string, lat: number, lng: number) {
        return this.db.$transaction(async (tx: any) => {
            const driver = await tx.driver.update({ where: { id: driverId }, data: { currentLat: lat, currentLng: lng } });
            await this.publishStatusSnapshot(tx, driver);
            return driver;
        });
    }

    async publishStatusSnapshot(tx: any, driver: any) {
        let maxWeightKg = 0;
        if (driver.assignedVehicleId) {
            const vehicle = await tx.vehicle.findUnique({ where: { id: driver.assignedVehicleId } });
            maxWeightKg = vehicle?.maxWeightKg ?? 0;
        }
        await tx.outboxEvent.create({
            data: {
                tenantId: driver.tenantId, // the DRIVER's tenant: 'platform' for freelancers
                topic: KAFKA_TOPICS.DRIVER_EVENTS,
                eventType: EVENT_TYPES.DRIVER_STATUS_CHANGED,
                payload: { driverId: driver.id, status: driver.shiftStatus, lat: driver.currentLat, lng: driver.currentLng, maxWeightKg },
            },
        });
    }

    assertEligibleForService(driver: any, vehicle: any) {
        const now = new Date();
        if (!driver.licenseVerifiedAt) throw new BadRequestException('Your driver license has not been verified by an administrator yet');
        if (driver.licenseExpiry <= now) throw new BadRequestException('Your driver license has expired');
        if (!vehicle) throw new BadRequestException('No vehicle assigned');
        if (vehicle.maintenanceState !== 'OPERATIONAL') throw new BadRequestException('Your vehicle is in maintenance');
        if (!vehicle.insuranceExpiry || vehicle.insuranceExpiry <= now) {
            throw new BadRequestException('Your vehicle insurance is missing or has expired');
        }
    }

    async assertEligible(driverId: string) {
        const driver = await this.get(driverId);
        const vehicle = driver.assignedVehicleId
            ? await this.db.vehicle.findUnique({ where: { id: driver.assignedVehicleId } })
            : null;
        this.assertEligibleForService(driver, vehicle);
    }

    async releaseIfIdle(driverId: string) {
        const driver = await this.db.driver.findUnique({ where: { id: driverId } });
        if (!driver || driver.shiftStatus !== 'BUSY') return;
        const remaining = await this.db.assignmentOffer.count({ where: { driverId, status: 'ACCEPTED' } });
        if (remaining > 0) return;

        const vehicle = driver.assignedVehicleId
            ? await this.db.vehicle.findUnique({ where: { id: driver.assignedVehicleId } })
            : null;
        let target = 'AVAILABLE';
        try {
            this.assertEligibleForService(driver, vehicle);
        } catch (error) {
            if (!(error instanceof BadRequestException)) throw error;
            target = 'OFFLINE';
        }
        await this.applyShiftStatus(driverId, target);
    }

    async verifyLicense(driverId: string, actor: { role?: string }) {
        const driver = await this.get(driverId);
        this.assertActorMayManage(driver.tenantId, actor);
        if (driver.licenseExpiry <= new Date()) throw new BadRequestException('This license has already expired');
        return this.db.driver.update({ where: { id: driverId }, data: { licenseVerifiedAt: new Date() } });
    }

    async updateLicense(driverId: string, dto: UpdateLicenseDto) {
        const driver = await this.get(driverId);
        const updated = await this.db.driver.update({
            where: { id: driverId },
            data: { licenseNumber: dto.licenseNumber, licenseExpiry: new Date(dto.licenseExpiry), licenseVerifiedAt: null },
        });
        // New license details need verifying again, so an available driver steps back until then.
        if (driver.shiftStatus === 'AVAILABLE') await this.applyShiftStatus(driverId, 'OFFLINE');
        return updated;
    }

    // How a bad actor leaves the pool: the license check is undone and the driver is taken off the board.
    async revokeVerification(driverId: string, actor: { role?: string }) {
        const driver = await this.get(driverId);
        this.assertActorMayManage(driver.tenantId, actor);
        const updated = await this.db.driver.update({ where: { id: driverId }, data: { licenseVerifiedAt: null } });
        if (driver.shiftStatus === 'AVAILABLE') await this.applyShiftStatus(driverId, 'OFFLINE');
        return updated;
    }

    // The platform admin is not a tenant admin: it may touch the freelance pool, never a business's own drivers.
    assertActorMayManage(tenantId: string, actor: { role?: string }) {
        if (actor.role === 'SUPER_ADMIN' && tenantId !== PLATFORM_TENANT_ID) {
            throw new ForbiddenException('Platform admins manage platform drivers only');
        }
    }

    // The userId arrives from the client and used to be trusted blindly, which would let a business admin
    // pre-empt someone else's account (a freelancer's, now). Identity is the authority, and it answers
    // tenant-scoped: another organization's user is simply "not found".
    private async assertUserIsDriverInTenant(userId: string, auth: { cookie?: string; authorization?: string }) {
        const base = process.env.IDENTITY_URL ?? `http://127.0.0.1:${process.env.IDENTITY_PORT ?? 3001}`;
        const headers: Record<string, string> = {};
        if (auth.cookie) headers.Cookie = auth.cookie;
        if (auth.authorization) headers.Authorization = auth.authorization;
        const res = await fetch(`${base}/users/${encodeURIComponent(userId)}`, {
            headers,
            signal: AbortSignal.timeout(5000),
        }).catch(() => null);
        if (!res) throw new ServiceUnavailableException('Could not verify the user right now. Try again.');
        if (res.status === 404) throw new BadRequestException('No such user in your organization');
        if (!res.ok) throw new BadRequestException('Could not verify that user');
        const user: any = await res.json();
        if (user.role !== 'DRIVER') throw new BadRequestException('That user does not have the DRIVER role');
    }

    // Platform drivers create their own profile; a business's drivers are onboarded by that business.
    async selfOnboard(user: { userId: string; tenantId: string }, dto: SelfOnboardDto) {
        if (user.tenantId !== PLATFORM_TENANT_ID) throw new ForbiddenException('Your organization onboards its own drivers');
        try {
            return await this.db.driver.create({
                data: {
                    id: user.userId, licenseNumber: dto.licenseNumber, licenseExpiry: new Date(dto.licenseExpiry),
                    emergencyContactName: dto.emergencyContactName, emergencyContactPhone: dto.emergencyContactPhone,
                },
            });
        } catch (err: any) {
            if (err.code === 'P2002') throw new ConflictException('You already have a driver profile');
            throw err;
        }
    }

    async createOwnVehicle(user: { userId: string; tenantId: string }, dto: CreateOwnVehicleDto) {
        if (user.tenantId !== PLATFORM_TENANT_ID) throw new ForbiddenException('Your organization manages your vehicle');
        const driver = await this.get(user.userId); // 404 until the profile exists
        if (driver.assignedVehicleId) throw new ConflictException('You already have a vehicle on file');
        try {
            return await this.db.$transaction(async (tx: any) => {
                await tx.$queryRaw`SELECT id FROM "Driver" WHERE id = ${user.userId} FOR UPDATE`;
                const lockedDriver = await tx.driver.findUnique({ where: { id: user.userId } });
                if (!lockedDriver) throw new NotFoundException('Driver not found');
                if (lockedDriver.assignedVehicleId) throw new ConflictException('You already have a vehicle on file');

                const vehicle = await tx.vehicle.create({ data: { ...dto, assignedDriverId: user.userId } });
                const updated = await tx.driver.update({ where: { id: user.userId }, data: { assignedVehicleId: vehicle.id } });
                await this.publishStatusSnapshot(tx, updated); // capacity changed
                return vehicle;
            });
        } catch (err: any) {
            if (err.code === 'P2002') throw new ConflictException('That license plate is already registered');
            throw err;
        }
    }

    // SUPER_ADMIN's review queue. Unverified or ineligible first when needsReview is set.
    async listPlatformDrivers(needsReview = false, page = 1, limit = 200) {
        if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 200) {
            throw new BadRequestException('Page must be positive and limit must be between 1 and 200');
        }

        const where = { tenantId: PLATFORM_TENANT_ID };
        const orderBy = [{ createdAt: 'desc' }, { id: 'desc' }];
        const offset = (page - 1) * limit;

        if (!needsReview) {
            const drivers = await this.db.driver.findMany({ where, orderBy, skip: offset, take: limit });
            return this.toPlatformDriverRows(drivers);
        }

        const rows: any[] = [];
        let scanned = 0;
        let matching = 0;
        const batchSize = 200;

        while (true) {
            const drivers = await this.db.driver.findMany({
                where,
                orderBy,
                skip: scanned,
                take: batchSize,
            });
            if (drivers.length === 0) break;

            for (const row of await this.toPlatformDriverRows(drivers)) {
                if (row.eligible) continue;
                if (matching >= offset) rows.push(row);
                matching++;
                if (rows.length === limit) return rows;
            }

            scanned += drivers.length;
            if (drivers.length < batchSize) break;
        }

        return rows;
    }

    private async toPlatformDriverRows(drivers: any[]) {
        const vehicleIds = drivers.map((d: any) => d.assignedVehicleId).filter(Boolean);
        const vehicles = vehicleIds.length ? await this.db.vehicle.findMany({ where: { id: { in: vehicleIds } } }) : [];
        const byId = new Map<string, any>(vehicles.map((v: any) => [v.id, v]));

        const rows = drivers.map((d: any) => {
            const vehicle = d.assignedVehicleId ? byId.get(d.assignedVehicleId) ?? null : null;
            let eligible = true;
            let blocker: string | null = null;
            try { this.assertEligibleForService(d, vehicle); } catch (e: any) { eligible = false; blocker = e.message; }
            return {
                driverId: d.id, shiftStatus: d.shiftStatus, createdAt: d.createdAt,
                licenseNumber: d.licenseNumber, licenseExpiry: d.licenseExpiry, licenseVerifiedAt: d.licenseVerifiedAt,
                vehicle: vehicle && { id: vehicle.id, licensePlate: vehicle.licensePlate, vehicleClass: vehicle.vehicleClass, insuranceExpiry: vehicle.insuranceExpiry },
                eligible, blocker,
            };
        });
        return rows;
    }
}