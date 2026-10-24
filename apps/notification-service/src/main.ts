import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NotificationServiceModule } from './notification-service.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationServiceModule);
  app.use(cookieParser());
  // Needed for EventSource with credentials. Match whatever origin setting identity-service uses.
  app.enableCors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173', credentials: true });
  const port = process.env.NOTIFICATION_PORT ?? 3006;
  await app.listen(port);
  console.log("==========================================");
  console.log("Notification-service listening on port", process.env.NOTIFICATION_PORT ?? 3006);
  console.log("==========================================");
}
bootstrap();