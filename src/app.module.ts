import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { UserResolver } from './resolvers/user/Users.resolver';
import { Logger, LoggerModule } from 'nestjs-pino';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env.schema';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './mongoose-config/mongoose-config.service';
import { Connection } from 'mongoose';

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
      isGlobal: true,
    }),
    EnvModule,
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      connectionName: 'dega-server'
    })
  ],
  providers: [
    UserResolver,
    MongooseConfigService,
  ],
})
export class AppModule implements OnModuleInit{
  constructor(
    private readonly _scream: Logger,
    @InjectConnection('dega-server') private readonly _dbConn: Connection
  ){}
  onModuleInit() {
    if (this._dbConn.readyState === 1) {
      this._scream.log('database connection succesfull', 'MongoDB');
    }
    process.on('SIGINT', () => {
      this._dbConn.close();
      this._scream.warn('closing database connection and exiting', 'Exit Process');
      process.exit(0);
    })
  }
}
