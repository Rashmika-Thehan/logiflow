import { BadRequestException, ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { TENANT_PRISMA } from '../prisma/prisma.module';
import { normalizeJoinCode } from '../tenant-settings/tenant-settings.service';
import { SubmitJoinRequestDto } from './dto/submit-join-request.dto';
import { ApproveJoinRequestDto } from './dto/resolve-join-request.dto';
import { EVENT_TYPES, KAFKA_TOPICS, NOTIFICATION_TEMPLATES } from '@app/contracts';

const BCRYPT_COST = 12;
const MAX_PENDING_PER_TENANT = 100; // stops a flood from burying the admin's queue

@Injectable()
export class JoinRequestsService {
    constructor(
        // Unscoped: submitting and checking status happen before any session exists.
        private readonly prisma: PrismaService,
        // Scoped: everything the tenant's own admin does.
        @Inject(TENANT_PRISMA) private readonly db: any,
    ) { }

    // ---- public ----

    async submit(dto: SubmitJoinRequestDto) {
        const tenant = await this.prisma.tenant.findUnique({ where: { joinCode: normalizeJoinCode(dto.joinCode) } });
        // Same answer whether the code never existed or was disabled or rotated.
        if (!tenant) throw new BadRequestException('Invalid join code');

        const email = dto.email.trim().toLowerCase();

        const existingUser = await this.prisma.user.findFirst({
            where: { email: { equals: email, mode: 'insensitive' } },
        });
        if (existingUser) throw new ConflictException('An account with this email already exists');

        const alreadyPending = await this.prisma.joinRequest.findFirst({
            where: { tenantId: tenant.id, email, status: 'PENDING' },
        });
        if (alreadyPending) throw new ConflictException('A request from this email is already pending');

        const pendingCount = await this.prisma.joinRequest.count({ where: { tenantId: tenant.id, status: 'PENDING' } });
        if (pendingCount >= MAX_PENDING_PER_TENANT) {
            throw new HttpException('This organization has too many pending requests right now', HttpStatus.TOO_MANY_REQUESTS);
        }

        const passwordHash = await bcrypt.hash(dto.password, BCRYPT_COST);
        const request = await this.prisma.joinRequest.create({
            data: {
                tenantId: tenant.id,
                email,
                fullName: dto.fullName,
                phone: dto.phone,
                passwordHash,
                requestedRole: dto.requestedRole,
            },
        });

        // The id is a random UUID; it's the requester's handle for checking status.
        return { requestId: request.id, status: request.status };
    }

    async status(id: string) {
        const request = await this.prisma.joinRequest.findUnique({ where: { id }, select: { status: true } });
        if (!request) throw new NotFoundException('Request not found');
        return { status: request.status };
    }

    // ---- tenant admin ----

    list(status: string = 'PENDING') {
        return this.db.joinRequest.findMany({
            where: { status },
            select: {
                id: true, email: true, fullName: true, phone: true, requestedRole: true,
                status: true, resolvedRole: true, resolvedAt: true, createdAt: true,
            }, // never passwordHash
            orderBy: { createdAt: 'asc' },
            take: 100,
        });
    }

    async approve(id: string, dto: ApproveJoinRequestDto, approverId: string) {
        // Scoped read: a request id from another tenant simply isn't found.
        const request = await this.db.joinRequest.findUnique({ where: { id } });
        const tenant = await this.prisma.tenant.findUnique({ where: { id: request.tenantId }, select: { name: true } });
        if (!request) throw new NotFoundException('Join request not found');
        if (request.status !== 'PENDING') throw new ConflictException(`Request is already ${request.status}`);

        const role = dto.role ?? request.requestedRole;

        try {
            return await this.db.$transaction(async (tx: any) => {
                // Conditional claim, so two admins approving at once can't both create a user.
                const claimed = await tx.joinRequest.updateMany({
                    where: { id, status: 'PENDING' },
                    data: {
                        status: 'APPROVED', resolvedRole: role, resolvedById: approverId,
                        resolvedAt: new Date(), passwordHash: null, // no reason to keep the hash around now
                    },
                });
                if (claimed.count === 0) throw new ConflictException('Request was already resolved');

                // tenantId is stamped by the scoping extension (the approving admin's tenant).
                const user = await tx.user.create({
                    data: {
                        email: request.email, passwordHash: request.passwordHash, role,
                        fullName: request.fullName, phone: request.phone,
                    },
                });

                await tx.outboxEvent.create({
                    data: {
                        topic: KAFKA_TOPICS.NOTIFICATION_REQUESTS,
                        eventType: EVENT_TYPES.SEND_NOTIFICATION,
                        payload: {
                            channel: 'EMAIL',
                            template: NOTIFICATION_TEMPLATES.JOIN_REQUEST_APPROVED,
                            to: { email: request.email, name: request.fullName },
                            data: { organizationName: tenant?.name ?? 'your organization', role, recipientName: request.fullName },
                        },
                    },
                });
                return { userId: user.id, email: user.email, role };
            });
        } catch (err: any) {
            // The email was registered (or invited-and-accepted) after the request
            // was filed. The claim rolls back; the admin can reject the request.
            if (err.code === 'P2002') throw new ConflictException('An account with this email already exists');
            throw err;
        }
    }

    async reject(id: string, reason: string | undefined, resolverId: string) {
        const request = await this.db.joinRequest.findUnique({ where: { id } });
        if (!request || request.status !== 'PENDING') throw new NotFoundException('No pending join request with that id');
        const tenant = await this.prisma.tenant.findUnique({ where: { id: request.tenantId }, select: { name: true } });

        await this.db.$transaction(async (tx: any) => {
            const result = await tx.joinRequest.updateMany({
                where: { id, status: 'PENDING' },
                data: {
                    status: 'REJECTED', rejectionReason: reason ?? null, resolvedById: resolverId,
                    resolvedAt: new Date(), passwordHash: null,
                },
            });
            if (result.count === 0) throw new NotFoundException('No pending join request with that id');

            await tx.outboxEvent.create({
                data: {
                    topic: KAFKA_TOPICS.NOTIFICATION_REQUESTS,
                    eventType: EVENT_TYPES.SEND_NOTIFICATION,
                    payload: {
                        channel: 'EMAIL',
                        template: NOTIFICATION_TEMPLATES.JOIN_REQUEST_REJECTED,
                        to: { email: request.email, name: request.fullName },
                        data: { organizationName: tenant?.name ?? 'your organization', recipientName: request.fullName },
                    },
                },
            });
        });
        return { id, status: 'REJECTED' };
    }
}