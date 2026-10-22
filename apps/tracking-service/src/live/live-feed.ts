import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';
import { Eta } from '../ingest/eta';

export interface PositionUpdate {
    tenantId: string; driverId: string;
    lat: number; lng: number; ts: number; speedKmh?: number; heading?: number;
    trips: { shipmentId: string; eta?: Eta }[];
}

// In-process fan-out between ingestion and the gateways. Fine for one instance;
// several instances would swap this for the socket.io Redis adapter.
@Injectable()
export class LiveFeed {
    readonly positions$ = new Subject<PositionUpdate>();
    readonly tripEnded$ = new Subject<{ shipmentId: string; status: string }>();
}