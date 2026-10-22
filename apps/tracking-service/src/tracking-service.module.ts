import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { CommonAuthModule } from '@app/common';
import { BREADCRUMB, BreadcrumbSchema, TRIP, TripSchema } from './schemas';
import { PositionStore } from './ingest/position-store';
import { BreadcrumbWriter } from './ingest/breadcrumb.writer';
import { LocationPublisher } from './ingest/location.publisher';
import { IngestionService } from './ingest/ingestion.service';
import { LiveFeed } from './live/live-feed';
import { IngestGateway, LiveGateway, TrackGateway } from './live/gateways';
import { TripsService } from './trips/trips.service';
import { TripEventsConsumer } from './trips/trip-events.consumer';
import { WsAuthService } from './ws/ws-auth.service';
import { TrackingController } from './api/tracking.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: join(__dirname, '../../../.env') }),
    CommonAuthModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGO_URI ?? 'mongodb://localhost:27017/logiflow_tracking' }),
    }),
    MongooseModule.forFeature([
      { name: BREADCRUMB, schema: BreadcrumbSchema },
      { name: TRIP, schema: TripSchema },
    ]),
  ],
  controllers: [TrackingController],
  providers: [
    WsAuthService, PositionStore, BreadcrumbWriter, LocationPublisher, LiveFeed,
    IngestionService, TripsService, TripEventsConsumer,
    IngestGateway, LiveGateway, TrackGateway,
  ],
})
export class TrackingServiceModule { }