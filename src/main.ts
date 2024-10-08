import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // evita campos extras en el Payload al crear
      //forbidNonWhitelisted: true,
      //disableErrorMessages: true, 
    }),
  );
  await app.listen(3000);
}
bootstrap();