import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { TrackingServiceModule } from './tracking-service.module';
import { CorsIoAdapter } from './ws/cors-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(TrackingServiceModule);
  app.use(cookieParser());
  app.enableCors({ origin: (process.env.FRONTEND_URL ?? 'http://localhost:5173').split(','), credentials: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useWebSocketAdapter(new CorsIoAdapter(app));
  const port = process.env.TRACKING_PORT ?? 3005;
  await app.listen(port);
  console.log("=======================================================");
  console.log("Tracking-service listening on port", process.env.TRACKING_PORT ?? 3005);
  console.log("=======================================================");
}
bootstrap();