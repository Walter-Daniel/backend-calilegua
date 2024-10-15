import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('APIKEY') private APIKEY: string) {} 

  getApiKey(): string {
    console.log(this.APIKEY)
    return `La llave de la aplicación es: ${this.APIKEY}`;
  }
}
