import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('APIKEY') private key: string) {} 

  getApiKey(): string {
    console.log(this.key)
    return `La llave de la aplicación es: ${this.key}`;
  }
}
