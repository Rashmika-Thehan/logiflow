import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles, RolesGuard } from '@app/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller('branches')
@UseGuards(RolesGuard)
export class BranchesController {
    constructor(private readonly branchesService: BranchesService) { }

    @Roles('BUSINESS_ADMIN')
    @Post()
    create(@Body() dto: CreateBranchDto) {
        return this.branchesService.create(dto);
    }

    // Dispatchers need to see pickup hubs to plan routes — read access is wider than write.
    @Roles('BUSINESS_ADMIN', 'DISPATCHER')
    @Get()
    list() {
        return this.branchesService.list();
    }

    @Roles('BUSINESS_ADMIN')
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
        return this.branchesService.update(id, dto);
    }

    @Roles('BUSINESS_ADMIN')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.branchesService.remove(id);
    }
}