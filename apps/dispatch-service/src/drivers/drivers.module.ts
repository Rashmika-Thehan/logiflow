import { Module } from '@nestjs/common';
import { DRIVER_DIRECTORY_PORT } from './driver-directory.port';
import { StubDriverDirectoryService } from './stub-driver-directory.service';

@Module({
    providers: [{ provide: DRIVER_DIRECTORY_PORT, useClass: StubDriverDirectoryService }],
    exports: [DRIVER_DIRECTORY_PORT],
})
export class DriversModule { }