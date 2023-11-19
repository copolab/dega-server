import { Injectable } from '@nestjs/common';
import { MailerService as MailService } from '@nestjs-modules/mailer'
import { OnEvent } from '@nestjs/event-emitter';
import { IMailerEvents } from './mailer.type';
import { WelcomeEvent } from './events/Welcome.event';

@Injectable()
export class MailerService {
    constructor(
        private readonly _mailService: MailService
    ) { }

    @OnEvent(IMailerEvents.WELCOME)
    async sendWelcomeEmail(event: WelcomeEvent): Promise<void> {
    await this._mailService.sendMail({
        to: event.to,
        subject: 'Welcome to COPOLAB',
        text: 'welcomee ' + event.message,
        template: './welcome',
        context: {message: event.message}
    });
  }
}
