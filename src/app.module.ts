import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { OperatorsModule } from './operators/operators.module';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345'

@Module({
  imports: [ProductsModule, OperatorsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY
    }
  ],
})
export class AppModule {}
