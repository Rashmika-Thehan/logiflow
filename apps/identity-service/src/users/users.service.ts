import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { PrismaService } from '../../prisma/prisma.service';
import { PLATFORM_TENANT_ID } from '@app/contracts';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

const BCRYPT_COST = 12;

@Injectable()
export class UsersService {
    // Typed loosely for now — tightening this to the exact extended-client
    // type is a later cleanup, not a blocker.
    constructor(@Inject(TENANT_PRISMA) private readonly db: any, private readonly prisma: PrismaService) { }

    // No `where: { tenantId }` here — the extension injects it automatically.
    listTeammates() {
        return this.db.user.findMany({
            select: { id: true, email: true, role: true, fullName: true, phone: true, createdAt: true },
        });
    }

    // SUPER_ADMIN's view of who is in the freelance pool; driver-service holds the verification status.
    listPlatformDrivers() {
        return this.prisma.user.findMany({
            where: { tenantId: PLATFORM_TENANT_ID, role: 'DRIVER' },
            select: { id: true, email: true, fullName: true, phone: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
            take: 200,
        });
    }

    // Tenant-scoped: another organization's user id is simply "not found". driver-service uses this to validate onboarding.
    async getTeammate(id: string) {
        const user = await this.db.user.findUnique({ where: { id }, select: { id: true, email: true, role: true, fullName: true, phone: true } });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                role: true,
                fullName: true,
                phone: true,
                googleId: true,
                passwordHash: true,
                createdAt: true,
            },
        });
        if (!user) throw new NotFoundException('User profile not found');
        const { passwordHash, googleId, ...rest } = user;
        return {
            ...rest,
            hasPassword: Boolean(passwordHash),
            isGoogleUser: Boolean(googleId),
        };
    }

    async updateProfile(userId: string, dto: UpdateProfileDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const updated = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...(dto.fullName !== undefined ? { fullName: dto.fullName } : {}),
                ...(dto.phone !== undefined ? { phone: dto.phone } : {}),
            },
            select: { id: true, email: true, role: true, fullName: true, phone: true, createdAt: true },
        });
        return updated;
    }

    async changePassword(userId: string, dto: ChangePasswordDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        // If user already has a password set, require currentPassword validation
        if (user.passwordHash) {
            if (!dto.currentPassword) {
                throw new BadRequestException('Current password is required to change password');
            }
            const isMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
            if (!isMatch) {
                throw new BadRequestException('Current password does not match');
            }
        }

        const passwordHash = await bcrypt.hash(dto.newPassword, BCRYPT_COST);
        await this.prisma.user.update({
            where: { id: userId },
            data: { passwordHash },
        });

        return { success: true, message: 'Password updated successfully' };
    }
}