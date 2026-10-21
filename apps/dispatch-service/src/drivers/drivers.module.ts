import { Module } from '@nestjs/common';
import { DRIVER_DIRECTORY_PORT } from './driver-directory.port';
import { RealDriverDirectoryService } from './real-driver-directory.service';
import { DriverFeedConsumer } from './driver-feed.consumer';

@Module({
    providers: [
        { provide: DRIVER_DIRECTORY_PORT, useClass: RealDriverDirectoryService },
        DriverFeedConsumer,
    ],
    exports: [DRIVER_DIRECTORY_PORT],
})
export class DriversModule { }