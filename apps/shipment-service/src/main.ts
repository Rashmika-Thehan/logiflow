import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { ShipmentServiceModule } from './shipment-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ShipmentServiceModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const port = process.env.SHIPMENT_PORT ?? 3002;
  await app.listen(port);
  console.log("==========================================");
  console.log("Shipment-service listening on port", process.env.SHIPMENT_PORT ?? 3002);
  console.log("==========================================");
}
bootstrap();