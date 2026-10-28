import { ForbiddenException } from '@nestjs/common';
import { EVENT_TYPES } from '@app/contracts';
import { ShipmentsService } from './shipments.service';

jest.mock('../prisma/prisma.service', () => ({ PrismaService: class {} }));
jest.mock('../prisma/prisma.module', () => ({
  TENANT_PRISMA: 'TENANT_PRISMA',
}));
jest.mock('@app/common', () => ({ encryptField: jest.fn() }));

describe('ShipmentsService assignment lifecycle', () => {
  const shipmentId = 'shipment';
  const oldAssignment = 'old-assignment';
  const newAssignment = 'new-assignment';
  const oldDriver = 'old-driver';
  const newDriver = 'new-driver';
  let shipment: any;
  let assignments: Map<string, any>;
  let db: any;
  let service: ShipmentsService;

  beforeEach(() => {
    shipment = {
      id: shipmentId,
      status: 'IN_TRANSIT',
      assignedDriverId: oldDriver,
      assignedAssignmentId: oldAssignment,
      recipientEmail: null,
      deliveryOtp: '1234',
    };
    assignments = new Map();
    db = {
      shipment: {
        findUnique: jest.fn(async () => ({ ...shipment })),
        updateMany: jest.fn(async ({ where, data }) => {
          if (
            where.status !== shipment.status ||
            ('assignedAssignmentId' in where &&
              where.assignedAssignmentId !== shipment.assignedAssignmentId)
          ) {
            return { count: 0 };
          }
          Object.assign(shipment, data);
          return { count: 1 };
        }),
      },
      shipmentAssignment: {
        upsert: jest.fn(async ({ where, create, update }) => {
          const record = assignments.get(where.id);
          assignments.set(where.id, record ? { ...record, ...update } : create);
        }),
        findFirst: jest.fn(
          async ({ where }) =>
            [...assignments.values()]
              .filter((record) => record.shipmentId === where.shipmentId)
              .sort(
                (a, b) => b.assignedAt.getTime() - a.assignedAt.getTime(),
              )[0],
        ),
      },
      outboxEvent: { create: jest.fn() },
      $transaction: jest.fn(async (callback) => callback(db)),
    };
    service = new ShipmentsService(db, {} as any);
  });

  const offer = async (
    assignmentId = newAssignment,
    driverId = newDriver,
    occurredAt = '2026-10-28T12:00:00.000Z',
    active = true,
  ) =>
    service.recordAssignment(
      shipmentId,
      assignmentId,
      driverId,
      occurredAt,
      active,
    );

  const accept = (assignmentId = newAssignment, driverId = newDriver) =>
    service.advanceForward(shipmentId, 'ASSIGNED', { assignmentId, driverId });

  it.each(['ASSIGNED', 'PICKED_UP', 'IN_TRANSIT'])(
    'stores a replacement driver while preserving %s and its notifications',
    async (status) => {
      shipment.status = status;
      await offer();
      await accept();
      expect(shipment).toMatchObject({
        status,
        assignedDriverId: newDriver,
        assignedAssignmentId: newAssignment,
      });
      expect(db.outboxEvent.create).not.toHaveBeenCalled();
    },
  );

  it.each(['CANCELLED', 'DELIVERED', 'FAILED'])(
    'does not change a %s shipment',
    async (status) => {
      shipment.status = status;
      await offer();
      await accept();
      expect(shipment.assignedDriverId).toBe(oldDriver);
      expect(db.shipment.updateMany).not.toHaveBeenCalled();
    },
  );

  it('rejects a late accept for a revoked assignment', async () => {
    await offer(newAssignment, newDriver, '2026-10-28T12:00:00Z', false);
    await offer(); // a delayed DriverAssigned must preserve the revocation
    await accept();
    expect(shipment.assignedDriverId).toBe(oldDriver);
    expect(db.shipment.updateMany).not.toHaveBeenCalled();
  });

  it('rejects an old accept after a newer offer, even if the old offer arrives late', async () => {
    await offer();
    await offer(oldAssignment, oldDriver, '2026-10-28T11:00:00Z');
    await accept();
    await accept(oldAssignment, oldDriver);
    expect(shipment.assignedDriverId).toBe(newDriver);
    expect(db.shipment.updateMany).toHaveBeenCalledTimes(1);
  });

  it('does not accept an unknown assignment or mismatched driver', async () => {
    await accept();
    await offer();
    await accept(newAssignment, oldDriver);
    expect(db.shipment.updateMany).not.toHaveBeenCalled();
  });

  it('processes an acceptance delivered before its offer', async () => {
    await service.advanceForward(shipmentId, 'ASSIGNED', {
      assignmentId: newAssignment,
      driverId: newDriver,
      occurredAt: '2026-10-28T12:00:00Z',
    });
    expect(shipment.assignedDriverId).toBe(newDriver);
  });

  it('does not revive a cancelled assignment from a delayed acceptance', async () => {
    await offer(newAssignment, newDriver, '2026-10-28T12:01:00Z', false);
    await service.advanceForward(shipmentId, 'ASSIGNED', {
      assignmentId: newAssignment,
      driverId: newDriver,
      occurredAt: '2026-10-28T12:00:00Z',
    });
    expect(db.shipment.updateMany).not.toHaveBeenCalled();
  });

  it('keeps the original transition and single status event for an initial acceptance', async () => {
    shipment.status = 'DISPATCHING';
    shipment.assignedDriverId = null;
    shipment.assignedAssignmentId = null;
    await offer();
    await accept();
    await accept();
    expect(shipment).toMatchObject({
      status: 'ASSIGNED',
      assignedDriverId: newDriver,
    });
    expect(db.outboxEvent.create).toHaveBeenCalledTimes(1);
    expect(db.outboxEvent.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        eventType: EVENT_TYPES.SHIPMENT_STATUS_CHANGED,
        payload: { shipmentId, from: 'DISPATCHING', to: 'ASSIGNED' },
      }),
    });
  });

  it('does not regress a replacement when an old unassignment arrives late', async () => {
    shipment.status = 'ASSIGNED';
    await offer();
    await accept();
    await service.regressToDispatching(shipmentId, oldAssignment);
    expect(shipment).toMatchObject({
      status: 'ASSIGNED',
      assignedDriverId: newDriver,
    });
    expect(db.outboxEvent.create).not.toHaveBeenCalled();
  });

  it('clears the matching assignment on regression', async () => {
    shipment.status = 'ASSIGNED';
    await service.regressToDispatching(shipmentId, oldAssignment);
    expect(shipment).toMatchObject({
      status: 'DISPATCHING',
      assignedDriverId: null,
      assignedAssignmentId: null,
    });
    expect(db.outboxEvent.create).toHaveBeenCalledTimes(1);
  });

  it('does not overwrite a concurrent assignment change', async () => {
    await offer();
    db.shipmentAssignment.findFirst.mockImplementationOnce(async () => {
      shipment.assignedDriverId = 'concurrent-driver';
      shipment.assignedAssignmentId = 'concurrent-assignment';
      return assignments.get(newAssignment);
    });
    await accept();
    expect(shipment.assignedDriverId).toBe('concurrent-driver');
  });

  it('authorizes delivery for the replacement and rejects the previous driver', async () => {
    await offer();
    await accept();
    await expect(
      service.verifyDelivery(shipmentId, '1234', oldDriver),
    ).rejects.toThrow(ForbiddenException);
    db.shipment.updateMany.mockResolvedValueOnce({ count: 1 }); // OTP attempt claim
    await expect(
      service.verifyDelivery(shipmentId, '1234', newDriver),
    ).resolves.toEqual({
      success: true,
    });
    expect(shipment.status).toBe('DELIVERED');
  });
});
