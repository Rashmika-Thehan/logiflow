import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DriverServiceModule } from './driver-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DriverServiceModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.DRIVER_PORT ?? 3004;
  await app.listen(port);
  console.log("==========================================");
  console.log("Driver-service listening on port", process.env.DRIVER_PORT ?? 3004);
  console.log("==========================================");
}
bootstrap();