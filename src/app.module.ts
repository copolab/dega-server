import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserResolver } from './resolvers/user/Users.resolver';
import { LoggerModule } from 'nestjs-pino';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env.schema';

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
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true
    }),
    EnvModule,
    
  ],
  providers: [
    UserResolver,
  ],
})
export class AppModule {}
