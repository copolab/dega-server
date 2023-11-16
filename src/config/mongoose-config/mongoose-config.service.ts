import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { EnvService } from '../env/env.service';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(
        private readonly _configService: EnvService
    ){}
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        const u = this._configService.get('PORT');
        return {
            uri: this._configService.get('PRIMARY_DB_CONNECTION_STRING'),
            dbName: this._configService.get('PRIMARY_DB_NAME'),
        };
    }
}
