export const KAFKA_TOPICS = {
    SHIPMENT_EVENTS: 'shipment.events',
    DISPATCH_EVENTS: 'dispatch.events',
    DRIVER_EVENTS: 'driver.events',
    TRACKING_EVENTS: 'tracking.events',
} as const;

export type KafkaTopic = (typeof KAFKA_TOPICS)[keyof typeof KAFKA_TOPICS];

export const EVENT_TYPES = {
    SHIPMENT_CREATED: 'ShipmentCreated',
    SHIPMENT_STATUS_CHANGED: 'ShipmentStatusChanged',
    DRIVER_ASSIGNED: 'DriverAssigned',
    DRIVER_UNASSIGNED: 'DriverUnassigned',
    DRIVER_STATUS_CHANGED: 'DriverStatusChanged',
    DELIVERY_STARTED: 'DeliveryStarted',
    ASSIGNMENT_ACCEPTED: 'AssignmentAccepted',
    ASSIGNMENT_REJECTED: 'AssignmentRejected',
    DISPATCH_FAILED: 'DispatchFailed',
    ARRIVED_AT_PICKUP: 'ArrivedAtPickup',
    PACKAGE_COLLECTED: 'PackageCollected',
    DELIVERY_COMPLETED: 'DeliveryCompleted',
    DELIVERY_FAILED: 'DeliveryFailed',
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];