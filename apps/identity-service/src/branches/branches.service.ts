import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService {
    constructor(@Inject(TENANT_PRISMA) private readonly db: any) { }

    // No tenantId anywhere below — the extension injects it on create and
    // filters it on every read/update/delete.
    create(dto: CreateBranchDto) {
        return this.db.branch.create({ data: dto });
    }

    list() {
        return this.db.branch.findMany({ orderBy: { createdAt: 'desc' } });
    }

    async get(id: string) {
        const branch = await this.db.branch.findUnique({ where: { id } });
        if (!branch) throw new NotFoundException('Branch not found');
        return branch;
    }

    async getDefault() {
        const branch = await this.db.branch.findFirst({ where: { isDefault: true } });
        if (!branch) throw new NotFoundException('No default pickup branch is configured');
        return branch;
    }

    async setDefault(id: string) {
        const branch = await this.get(id);
        if (branch.latitude == null || branch.longitude == null) {
            throw new ConflictException('A branch needs latitude and longitude before it can be the default pickup branch');
        }

        try {
            return await this.db.$transaction(async (tx: any) => {
                await tx.branch.updateMany({ where: { isDefault: true }, data: { isDefault: false } });
                return tx.branch.update({ where: { id }, data: { isDefault: true } });
            });
        } catch (err: any) {
            if (err?.code === 'P2002') throw new ConflictException('Another default branch was selected concurrently; please retry');
            throw err;
        }
    }

    async update(id: string, dto: UpdateBranchDto) {
        const existing = await this.get(id);
        const latitude = dto.latitude ?? existing.latitude;
        const longitude = dto.longitude ?? existing.longitude;
        if (existing.isDefault && (latitude == null || longitude == null)) {
            throw new ConflictException('The default pickup branch must keep latitude and longitude');
        }
        const branch = await this.db.branch.update({ where: { id }, data: dto });
        if (!branch) throw new NotFoundException('Branch not found');
        return branch;
    }

    async remove(id: string) {
        const branch = await this.get(id);
        if (branch.isDefault) throw new ConflictException('Select another default branch before deleting this branch');
        return this.db.branch.delete({ where: { id } });
    }
}
