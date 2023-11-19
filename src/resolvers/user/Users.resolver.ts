import { Injectable } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";
import { Logger } from "nestjs-pino";
import { MailerService } from "../../mailer/mailer.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { WelcomeEvent } from "src/mailer/events/Welcome.event";
import { IMailerEvents } from "src/mailer/mailer.type";

@Injectable()
@Resolver()
export class UserResolver {
  constructor(
    private readonly _scream: Logger,
    private readonly _eventEmitter: EventEmitter2
  ){}

  @Query(returns => String)
  user(): string {
    this._scream.log('ola amigo');
    this._eventEmitter.emit(
      IMailerEvents.WELCOME,
      new WelcomeEvent('hurray event!', 'amalu.sajeev.me@gmail.com')
    );
    // this._mailer.sendWelcomeEmail('amalu@copolab.space')
      return "hello world2";
  }
}