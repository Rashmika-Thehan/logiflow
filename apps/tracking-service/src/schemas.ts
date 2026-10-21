import { Schema } from 'mongoose';

export const BREADCRUMB = 'Breadcrumb';
export const TRIP = 'Trip';

// Regular collection rather than time-series: time-series can't enforce the
// unique (driverId, ts) index that dedupes points a client resends.
export const BreadcrumbSchema = new Schema(
    {
        driverId: { type: String, required: true },
        tenantId: { type: String, required: true },
        ts: { type: Date, required: true }, // device clock
        loc: {
            type: { type: String, enum: ['Point'], required: true },
            coordinates: { type: [Number], required: true }, // [lng, lat]
        },
        speedKmh: Number,
        heading: Number,
        accuracyM: Number,
    },
    { collection: 'breadcrumbs', versionKey: false },
);
BreadcrumbSchema.index({ driverId: 1, ts: 1 }, { unique: true });
BreadcrumbSchema.index({ ts: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 }); // 30-day retention

// Read model built from shipment/dispatch events.
export const TripSchema = new Schema(
    {
        shipmentId: { type: String, required: true, unique: true },
        tenantId: { type: String, required: true },
        trackingCode: { type: String, required: true, unique: true },
        status: { type: String, required: true, default: 'PENDING' },
        driverId: String,        // current driver; cleared on unassign
        carrierDriverId: String, // driver at pickup time; used for replay
        destLat: Number,
        destLng: Number,
        pickedUpAt: Date,
        endedAt: Date,
    },
    { collection: 'trips', versionKey: false, timestamps: true },
);
TripSchema.index({ tenantId: 1, driverId: 1 });