import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger))
  const configService = app.get(EnvService);
  const port = configService.get('PORT');
  app.enableShutdownHooks();
  await app.listen(port);
}
bootstrap();
