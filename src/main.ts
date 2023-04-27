import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EventEmitter } from 'events';
import { AppModule } from './app.module';

// NESTJS GATEWAYS ERROR MAX LISTENERS
EventEmitter.setMaxListeners(50);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.setGlobalPrefix('api/v0');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
