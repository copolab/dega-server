import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { EnvService } from 'src/config/env/env.service';
import { DEFAULT_MAIL_FROM_ADDRESS, DEFAULT_MAIL_HOST, DEFAULT_MAIL_PORT } from './constants';

@Injectable()
export class MailerConfigService implements MailerOptionsFactory{

    constructor(
        private readonly _envService: EnvService
    ) { }

    createMailerOptions(): MailerOptions {
        let localTransport: MailerOptions['transport'] = {
            host: DEFAULT_MAIL_HOST,
            port: DEFAULT_MAIL_PORT,
            secure: false,
        }

        console.log('templates', join(__dirname, 'templates'));
        const liveTransport: MailerOptions['transport'] = {
            host: this._envService.get('EMAIL_SMTP_HOST'),
            port: +this._envService.get('EMAIL_SMTP_PORT'),
            auth: {
                user: this._envService.get('EMAIL_SMTP_uSER'),
                pass: this._envService.get('EMAIL_SMTP_PASS'),
            },
            secure: false,
        }
        const environment = this._envService.get('NODE_ENV');
        return {
            transport: environment === 'development' ? localTransport : liveTransport,
            template: {
                adapter: new PugAdapter(),
                dir: join(__dirname, 'templates'),
                options: { strict: true },
            },
            defaults: {
                from: DEFAULT_MAIL_FROM_ADDRESS,
            }
        }
    }
}