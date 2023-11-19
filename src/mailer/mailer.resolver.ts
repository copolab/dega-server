import { Resolver } from '@nestjs/graphql';
import { MailerService } from './mailer.service';

@Resolver('Mailer')
export class MailerResolver {
  constructor(private readonly mailerService: MailerService) {}
}
