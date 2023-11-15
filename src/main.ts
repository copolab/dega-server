import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(3000);

  setTimeout(() => {
    process.kill(process.pid, 'SIGTERM');
  }, 2000);
}
bootstrap();
