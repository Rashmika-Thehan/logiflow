import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { KAFKA_TOPICS, EVENT_TYPES } from '@app/contracts';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { OnboardDriverDto } from './dto/onboard-driver.dto';
import { assertValidManualShift } from './shift-rules';

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
        assertValidManualShift(driver.shiftStatus, target);

        // FR-DRV-05: can't go AVAILABLE with a vehicle that's down for
        // maintenance or uninsured. No vehicle assigned at all is also blocked —
        // you can't take deliveries with nothing to drive.
        if (target === 'AVAILABLE') {
            if (!driver.assignedVehicleId) throw new BadRequestException('No vehicle assigned');
            const vehicle = await this.db.vehicle.findUnique({ where: { id: driver.assignedVehicleId } });
            if (!vehicle || vehicle.maintenanceState !== 'OPERATIONAL' || !vehicle.insuranceValid) {
                throw new BadRequestException('Assigned vehicle is not eligible for service');
            }
        }

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
}