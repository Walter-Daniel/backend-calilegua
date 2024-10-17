import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('ASYNC_TASK') private task: [],
    private congif: ConfigService
  ) {} 

  getApiKey(): string {
    const apikey  = this.congif.get<string>('APIKEY');
    const dbName  = this.congif.get<string>('DB_NAME');
    return `La llave de la aplicación es: ${apikey} y el nombre de la base de datos es: ${dbName}`;
  }
}
