import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { IdentityServiceModule } from './identity-service.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(IdentityServiceModule);
  // The gateway sits in front and overwrites X-Forwarded-For with the real client address. Without
  // this, req.ip is the gateway for every caller: the API-key IP allowlist and the per-IP throttles
  // would all see a single client. Only safe because the gateway is the only way in.
  app.set('trust proxy', 1);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(process.env.IDENTITY_PORT ?? 3001);
  console.log("===============================================");
  console.log("Identity Service is running on port ", process.env.IDENTITY_PORT ?? 3001);
  console.log("===============================================");
}
bootstrap();

