import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

@Global()
@Module({
    imports: [
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true }, // opens a per-request context store before guards run
        }),
    ],
    exports: [ClsModule],
})
export class AppClsModule { }

export * from 'nestjs-cls';