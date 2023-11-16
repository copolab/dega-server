import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnv } from './env.schema';

@Injectable()
export class EnvService {
    constructor(
        private _configService: ConfigService<IEnv, true>
    ) { }
    get<T extends keyof IEnv>(key: T): IEnv[T] {
        return this._configService.get(key);
    }
}
