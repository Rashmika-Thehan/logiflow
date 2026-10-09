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

        const driver = await this.db.driver.findUnique({ where: { id: driverId } });
        if (!driver) throw new NotFoundException('Driver not found');

        await this.db.$transaction(async (tx: any) => {
            // 1. If this vehicle was assigned to a different driver, unassign that driver
            if (vehicle.assignedDriverId && vehicle.assignedDriverId !== driverId) {
                const prevDriver = await tx.driver.findUnique({ where: { id: vehicle.assignedDriverId } });
                if (prevDriver) {
                    const newShiftStatus = prevDriver.shiftStatus === 'AVAILABLE' ? 'OFFLINE' : prevDriver.shiftStatus;
                    const updatedPrevDriver = await tx.driver.update({
                        where: { id: prevDriver.id },
                        data: {
                            assignedVehicleId: null,
                            shiftStatus: newShiftStatus,
                        },
                    });
                    await this.driversService.publishStatusSnapshot(tx, updatedPrevDriver);
                }
            }

            // 2. If this driver had another vehicle assigned, clear that vehicle's assigned driver
            if (driver.assignedVehicleId && driver.assignedVehicleId !== vehicleId) {
                await tx.vehicle.update({
                    where: { id: driver.assignedVehicleId },
                    data: { assignedDriverId: null },
                });
            }

            // 3. Link the target vehicle and target driver
            await tx.vehicle.update({ where: { id: vehicleId }, data: { assignedDriverId: driverId } });
            const updatedDriver = await tx.driver.update({ where: { id: driverId }, data: { assignedVehicleId: vehicleId } });

            // 4. Capacity changed — candidates downstream need to know.
            await this.driversService.publishStatusSnapshot(tx, updatedDriver);
        });
        return { vehicleId, driverId };
    }

    async setMaintenance(vehicleId: string, state: 'OPERATIONAL' | 'IN_MAINTENANCE') {
        const vehicle = await this.db.vehicle.update({ where: { id: vehicleId }, data: { maintenanceState: state } });
        // If this vehicle's driver is currently AVAILABLE or ON_BREAK, flip them OFFLINE —
        // they can't keep showing as a candidate or resume availability with a down vehicle.
        if (vehicle.assignedDriverId && state === 'IN_MAINTENANCE') {
            const driver = await this.db.driver.findUnique({ where: { id: vehicle.assignedDriverId } });
            if (driver?.shiftStatus === 'AVAILABLE' || driver?.shiftStatus === 'ON_BREAK') {
                await this.driversService.applyShiftStatus(driver.id, 'OFFLINE');
            }
        }
        return vehicle;
    }
}