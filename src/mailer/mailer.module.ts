import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerResolver } from './mailer.resolver';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { EnvModule } from '../config/env/env.module';
import { EnvService } from '../config/env/env.service';
import { MailerConfigService } from './mailer-config.service';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      imports: [EnvModule],
      useClass: MailerConfigService,
      inject: [EnvService]
    }),
  ],
  providers: [MailerResolver, MailerService],
  exports: [MailerService]
})
export class MailerModule {}
