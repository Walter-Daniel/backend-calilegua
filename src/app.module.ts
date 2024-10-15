import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { OperatorsModule } from './operators/operators.module';
import { lastValueFrom } from 'rxjs';
import { HttpModule, HttpService } from '@nestjs/axios';
import { DatabaseModule } from './database/database.module';

// const APIKEY = 'DEV-456';
// const APIKEYPROD = 'PROD-12345'

@Module({
  imports: [ProductsModule, OperatorsModule, HttpModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'APIKEY',
    //   useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY
    // },
    {
      provide: 'TAREA_ASYNC',
      useFactory: async(http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/posts');
        const tarea = await lastValueFrom(req);
        return tarea.data
      },
      inject: [HttpService]
    }
  ],
})
export class AppModule {}
