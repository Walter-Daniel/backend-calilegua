import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('ASYNC_TASK') private task: [],
    // private congif: ConfigService
    @Inject(config.KEY) private configServ: ConfigType<typeof config>
  ) {} 

  getApiKey(): string {
    const apikey  = this.configServ.apikey;
    const dbName  = this.configServ.database.name;
    const dbport  = this.configServ.database.port;
    return `La llave de la aplicación es: ${apikey}, el nombre y el puerto de la base de son : ${dbName} y ${dbport}`;
  }
}
