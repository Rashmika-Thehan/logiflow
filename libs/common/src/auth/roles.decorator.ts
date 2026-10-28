import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ROLES_KEY } from './roles.constants';
import { RolesGuard } from './roles.guard';

export const Roles = (...roles: string[]) =>
  applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RolesGuard));

export { ROLES_KEY };