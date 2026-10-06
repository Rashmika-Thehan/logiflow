import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DispatchServiceModule } from './dispatch-service.module';

async function bootstrap() {
  const app = await NestFactory.create(DispatchServiceModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.DISPATCH_PORT ?? 3003;
  await app.listen(port);
  console.log("==========================================");
  console.log("Dispatch-service listening on port", process.env.DISPATCH_PORT ?? 3003);
  console.log("==========================================");
}
bootstrap();