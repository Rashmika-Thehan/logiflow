import { NestFactory } from '@nestjs/core';
import { ShipmentServiceModule } from './shipment-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ShipmentServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
