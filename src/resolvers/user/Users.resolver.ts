import { Injectable } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";
import { Logger } from "nestjs-pino";

@Injectable()
@Resolver()
export class UserResolver {
  constructor(
    private readonly _scream: Logger
  ){}

  @Query(returns => String)
  user(): string {
    this._scream.log('ola amigo');
      return "hello world";
  }
}