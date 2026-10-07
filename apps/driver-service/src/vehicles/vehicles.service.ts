import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { DriversService } from '../drivers/drivers.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehiclesService {
    constructor(
        @Inject(TENANT_PRISMA) private readonly db: any,
        private readonly driversService: DriversService,
    ) { }

    create(dto: CreateVehicleDto) {
        return this.db.vehicle.create({ data: dto });
    }

    list() {
        return this.db.vehicle.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async assign(vehicleId: string, driverId: string) {
        const vehicle = await this.db.vehicle.findUnique({ where: { id: vehicleId } });
        if (!vehicle) throw new NotFoundException('Vehicle not found');

        await this.db.$transaction(async (tx: any) => {
            await tx.vehicle.update({ where: { id: vehicleId }, data: { assignedDriverId: driverId } });
            const driver = await tx.driver.update({ where: { id: driverId }, data: { assignedVehicleId: vehicleId } });
            // Capacity changed — candidates downstream need to know.
            await this.driversService.publishStatusSnapshot(tx, driver);
        });
        return { vehicleId, driverId };
    }

    async setMaintenance(vehicleId: string, state: 'OPERATIONAL' | 'IN_MAINTENANCE') {
        const vehicle = await this.db.vehicle.update({ where: { id: vehicleId }, data: { maintenanceState: state } });
        // If this vehicle's driver is currently AVAILABLE, flip them OFFLINE —
        // they can't keep showing as a candidate with a down vehicle. Not
        // perfect (should probably notify them), but prevents a real gap.
        if (vehicle.assignedDriverId && state === 'IN_MAINTENANCE') {
            const driver = await this.db.driver.findUnique({ where: { id: vehicle.assignedDriverId } });
            if (driver?.shiftStatus === 'AVAILABLE') {
                await this.driversService.applyShiftStatus(driver.id, 'OFFLINE');
            }
        }
        return vehicle;
    }
}