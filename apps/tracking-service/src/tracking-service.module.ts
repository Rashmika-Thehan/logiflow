import { Module } from '@nestjs/common';
import { TrackingServiceController } from './tracking-service.controller';
import { TrackingServiceService } from './tracking-service.service';

@Module({
  imports: [],
  controllers: [TrackingServiceController],
  providers: [TrackingServiceService],
})
export class TrackingServiceModule {}
