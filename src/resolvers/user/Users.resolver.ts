import { Resolver, Query } from "@nestjs/graphql";

@Resolver()
export class UserResolver {

  @Query(returns => String)
  user(): string {
      return "hello world";
  }
}