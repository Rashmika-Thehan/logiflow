import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

    async update(id: string, dto: UpdateBranchDto) {
        const branch = await this.db.branch.update({ where: { id }, data: dto });
        if (!branch) throw new NotFoundException('Branch not found');
        return branch;
    }

    async remove(id: string) {
        const branch = await this.db.branch.delete({ where: { id } });
        if (!branch) throw new NotFoundException('Branch not found');
        return branch;
    }
}