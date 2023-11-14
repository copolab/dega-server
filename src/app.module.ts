import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserResolver } from './resolvers/user/Users.resolver';
import { LoggerModule } from 'nestjs-pino';

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
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
        autoLogging: false,
        quietReqLogger: true
      }
    }),
    
  ],
  providers: [
    UserResolver,
  ],
})
export class AppModule {}
