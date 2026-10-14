import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { AcceptInvitationDto } from './dto/accept-invitation.dto';

const BCRYPT_COST = 12;
const INVITE_TTL_MS = 72 * 60 * 60 * 1000;

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

@Injectable()
export class InvitationsService {
    constructor(
        // Unscoped: the email-exists check spans all tenants (email is globally
        // unique), and accept() runs before any session, and so any tenant, exists.
        private readonly prisma: PrismaService,
        // Scoped: everything an authenticated BUSINESS_ADMIN does with their own invitations.
        @Inject(TENANT_PRISMA) private readonly db: any,
    ) { }

    async create(dto: CreateInvitationDto, invitedById: string) {
        const email = dto.email.trim().toLowerCase();

        const existingUser = await this.prisma.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } },
        });
        if (existingUser) throw new ConflictException('This email address cannot be invited');

        const pendingRequest = await this.db.joinRequest.findFirst({ where: { email, status: 'PENDING' } });
        if (pendingRequest) {
            throw new ConflictException('This person already has a pending join request. Approve it instead');
        }

        const rawToken = randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + INVITE_TTL_MS);

        const invitation = await this.db.$transaction(async (tx: any) => {
            // Supersede any pending invitation for this email. The raw token is
            // only shown once, so a lost one needs a way to be replaced.
            await tx.invitation.updateMany({
                where: { email, acceptedAt: null, revokedAt: null },
                data: { revokedAt: new Date() },
            });
            return tx.invitation.create({
                data: { email, role: dto.role, tokenHash: hashToken(rawToken), invitedById, expiresAt },
            });
        });

        // Returned exactly once. When notification-service exists, email this to
        // the invitee instead of handing it to the inviter.
        return { id: invitation.id, email, role: invitation.role, expiresAt, inviteToken: rawToken };
    }

    async list() {
        const rows = await this.db.invitation.findMany({
            select: { id: true, email: true, role: true, expiresAt: true, acceptedAt: true, revokedAt: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
        });
        const now = new Date();
        return rows.map((r: any) => ({
            ...r,
            status: r.acceptedAt ? 'ACCEPTED' : r.revokedAt ? 'REVOKED' : r.expiresAt < now ? 'EXPIRED' : 'PENDING',
        }));
    }

    async revoke(id: string) {
        const result = await this.db.invitation.updateMany({
            where: { id, acceptedAt: null, revokedAt: null },
            data: { revokedAt: new Date() },
        });
        if (result.count === 0) throw new NotFoundException('No pending invitation with that id');
        return { id, status: 'REVOKED' };
    }

    async accept(dto: AcceptInvitationDto) {
        // One message for every failure, so the endpoint can't be used to probe tokens.
        const invalid = () => new BadRequestException('This invitation is invalid or has expired');

        const invitation = await this.prisma.invitation.findUnique({
            where: { tokenHash: hashToken(dto.token) },
        });
        if (!invitation || invitation.acceptedAt || invitation.revokedAt || invitation.expiresAt < new Date()) {
            throw invalid();
        }

        // Hash before the transaction so the slow bcrypt call doesn't hold it open.
        const passwordHash = await bcrypt.hash(dto.password, BCRYPT_COST);

        try {
            await this.prisma.$transaction(async (tx) => {
                // Conditional claim: of two concurrent accepts, only one matches a row.
                const claimed = await tx.invitation.updateMany({
                    where: { id: invitation.id, acceptedAt: null, revokedAt: null },
                    data: { acceptedAt: new Date() },
                });
                if (claimed.count === 0) throw invalid();

                await tx.user.create({
                    data: {
                        tenantId: invitation.tenantId,
                        email: invitation.email,
                        passwordHash,
                        role: invitation.role,
                        fullName: dto.fullName,
                        phone: dto.phone,
                    },
                });
            });
        } catch (err: any) {
            // Email got registered between invite and accept. The claim rolls back with the transaction.
            if (err.code === 'P2002') throw new ConflictException('An account with this email already exists');
            throw err;
        }

        return { email: invitation.email, role: invitation.role };
    }
}