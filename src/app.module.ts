import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserResolver } from './resolvers/user/Users.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      path: '/graphql',
      autoSchemaFile: true,
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()
      ]
    })
  ],
  providers: [
    UserResolver,
  ],
})
export class AppModule {}
