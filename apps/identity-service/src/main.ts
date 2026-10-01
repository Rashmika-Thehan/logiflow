import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { IdentityServiceModule } from './identity-service.module';

async function bootstrap() {
  const app = await NestFactory.create(IdentityServiceModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3001);
  console.log("===============================================");
  console.log("Identity Service is running on port ", process.env.PORT ?? 3001);
  console.log("===============================================");
}
bootstrap();
