import { Module } from '@nestjs/common';
import { Client } from 'pg';

import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { OperatorsModule } from './operators/operators.module';
import { DatabaseModule } from './postgres_data/database.module';
import { enviroments } from './enviroments';
import config from './config';

import * as Joi from 'joi';


const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

client.connect();
client.query('SELECT * FROM tasks', (err, res) => {
  console.error(err);
  console.log(res.rows);
});


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        APIKEY: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_PORT: Joi.number().required(),
      })
    }),
    HttpModule, 
    ProductsModule, 
    OperatorsModule, 
    DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'ASYNC_TASK',
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
