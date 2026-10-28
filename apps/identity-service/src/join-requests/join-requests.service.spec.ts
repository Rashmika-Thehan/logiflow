import { BadRequestException } from '@nestjs/common';
import { createHmac } from 'crypto';
import { JoinRequestsService } from './join-requests.service';

jest.mock('../../prisma/prisma.service', () => ({ PrismaService: class {} }));
jest.mock('../prisma/prisma.module', () => ({
  TENANT_PRISMA: 'TENANT_PRISMA',
}));
jest.mock('@app/common', () => ({ encryptField: jest.fn() }));

describe('JoinRequestsService.verifyEmail', () => {
  const requestId = 'join-request';
  const code = '123456';
  let previousSecret: string | undefined;
  let joinRequest: { findUnique: jest.Mock; updateMany: jest.Mock };
  let service: JoinRequestsService;

  beforeEach(() => {
    previousSecret = process.env.JWT_SECRET;
    process.env.JWT_SECRET = 'local-verification-test-secret';
    joinRequest = {
      findUnique: jest.fn().mockResolvedValue({
        id: requestId,
        status: 'PENDING',
        emailVerifiedAt: null,
        verifyCodeHash: createHmac('sha256', process.env.JWT_SECRET)
          .update(`join-verify:${requestId}:${code}`)
          .digest('hex'),
        verifyCodeExpiresAt: new Date(Date.now() + 60_000),
      }),
      updateMany: jest.fn().mockResolvedValue({ count: 1 }),
    };
    service = new JoinRequestsService({ joinRequest } as any, {});
  });

  afterEach(() => {
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  });

  it('rejects a request resolved between the initial read and verification write', async () => {
    joinRequest.updateMany
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 0 });

    await expect(service.verifyEmail(requestId, code)).rejects.toThrow(
      new BadRequestException('Invalid or expired code'),
    );
  });

  it('returns success when the pending request was updated', async () => {
    await expect(service.verifyEmail(requestId, code)).resolves.toEqual({
      emailVerified: true,
    });
    expect(joinRequest.updateMany).toHaveBeenCalledTimes(2);
  });

  it('preserves the idempotent response for an already verified pending request', async () => {
    joinRequest.findUnique.mockResolvedValue({
      status: 'PENDING',
      emailVerifiedAt: new Date(),
    });
    await expect(service.verifyEmail(requestId, code)).resolves.toEqual({
      emailVerified: true,
    });
    expect(joinRequest.updateMany).not.toHaveBeenCalled();
  });
});
