import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { KAFKA_TOPICS, EVENT_TYPES } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { OnboardDriverDto } from './dto/onboard-driver.dto';
import { assertValidManualShift } from './shift-rules';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Injectable()
export class DriversService {
    constructor(@Inject(TENANT_PRISMA) private readonly db: any) { }

    onboard(dto: OnboardDriverDto) {
        const { userId, ...rest } = dto;
        return this.db.driver.create({
            data: {
                id: userId,
                ...rest,
                licenseExpiry: new Date(dto.licenseExpiry),
            },
        });
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

    // Feeds dispatch-service's real DriverDirectoryPort implementation —
    // everything it needs to score this driver as a candidate, in one event.
    async publishStatusSnapshot(tx: any, driver: any) {
        let maxWeightKg = 0;
        if (driver.assignedVehicleId) {
            const vehicle = await tx.vehicle.findUnique({ where: { id: driver.assignedVehicleId } });
            maxWeightKg = vehicle?.maxWeightKg ?? 0;
        }
        await tx.outboxEvent.create({
            data: {
                topic: KAFKA_TOPICS.DRIVER_EVENTS,
                eventType: EVENT_TYPES.DRIVER_STATUS_CHANGED,
                payload: {
                    driverId: driver.id,
                    status: driver.shiftStatus,
                    lat: driver.currentLat,
                    lng: driver.currentLng,
                    maxWeightKg,
                },
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

    async verifyLicense(driverId: string) {
        const driver = await this.get(driverId);
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
}