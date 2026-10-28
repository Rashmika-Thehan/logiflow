# Assignment projection rollout

Deploy the dispatch producers that include `assignmentId` before the shipment
consumer. Apply this migration and regenerate the shipment Prisma client.

For an existing deployment, pause assignment changes and the shipment dispatch
consumer while seeding `ShipmentAssignment` from dispatch's `Assignment` rows:

- Copy `id`, `tenantId`, `shipmentId`, `driverId`, and `createdAt` as `assignedAt`
  for assignments with a driver. Set `active` only for `PENDING_ACCEPTANCE` and
  `ACCEPTED`; retain inactive rows as revocation tombstones.
- Set each shipment's `assignedAssignmentId` to its latest accepted assignment
  only when its tenant and `assignedDriverId` match.
- Resume the consumer at its existing offsets, then resume assignment changes.

This snapshot is necessary because the consumer does not replay historical
events on startup. Accepts also record the dispatch confirmation in the projection
so an accept delivered before its offer can still be processed. Known revocations
and newer assignments take precedence over a delayed accept.
Normal driver changes preserve `PICKED_UP`/`IN_TRANSIT`, and do not emit another
shipment status change or delivery code. Existing terminal shipments stay closed.
