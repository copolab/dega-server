import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        return {
            uri: process.env.PRIMARY_DB_CONNECTION_STRING,
            dbName: process.env.PRIMARY_DB_NAME,
        };
    }
}
