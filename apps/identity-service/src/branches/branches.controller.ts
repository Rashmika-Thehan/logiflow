import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Auth, Roles, RolesGuard } from '@app/common';
import { SCOPES } from '@app/contracts';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller('branches')
export class BranchesController {
    constructor(private readonly branchesService: BranchesService) { }

    @Roles('BUSINESS_ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateBranchDto) {
        return this.branchesService.create(dto);
    }

    // Dispatchers need to see pickup hubs to plan routes — read access is wider than write.
    @Auth({ roles: ['BUSINESS_ADMIN', 'DISPATCHER'], scopes: [SCOPES.SHIPMENTS_WRITE] })
    @Get()
    list() {
        return this.branchesService.list();
    }

    @Auth({ roles: ['BUSINESS_ADMIN', 'DISPATCHER'], scopes: [SCOPES.SHIPMENTS_WRITE] })
    @Get('default')
    getDefault() {
        return this.branchesService.getDefault();
    }

    @Auth({ roles: ['BUSINESS_ADMIN', 'DISPATCHER'], scopes: [SCOPES.SHIPMENTS_WRITE] })
    @Get(':id')
    get(@Param('id') id: string) {
        return this.branchesService.get(id);
    }

    @Roles('BUSINESS_ADMIN')
    @UseGuards(RolesGuard)
    @Patch(':id/default')
    setDefault(@Param('id') id: string) {
        return this.branchesService.setDefault(id);
    }

    @Roles('BUSINESS_ADMIN')
    @UseGuards(RolesGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
        return this.branchesService.update(id, dto);
    }

    @Roles('BUSINESS_ADMIN')
    @UseGuards(RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.branchesService.remove(id);
    }
}
