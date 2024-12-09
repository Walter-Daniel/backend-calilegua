import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { OperatorsModule } from './operators/operators.module';

import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import { ReportsModule } from './reports/reports.module';
import config from './config';

import * as Joi from 'joi';

// const client = new Client({
//   user: 'root',
//   host: 'localhost',
//   database: 'my_db',
//   password: '123456',
//   port: 5432,
// });

// client.connect();
// client.query('SELECT * FROM tasks', (err, res) => {
//   console.error(err);
//   console.log(res.rows);
// });

const uri = 'mongodb://walter:123456@localhost:27017/?authMechanism=DEFAULT';

// const client = new MongoClient(uri);
// async function run() {
//   await client.connect();
//   const database = client.db('admin');
//   const taskCollection = database.collection('tasks');
//   const tasks = await taskCollection.find().toArray();
//   console.log(tasks);
// }
// run();

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
      }),
    }),
    ProductsModule,
    OperatorsModule,
    DatabaseModule,
    AuthModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'MONGO', // Token para identificar al cliente
      useFactory: async () => {
        const uri =
          'mongodb://walter:123456@localhost:27017/?authMechanism=DEFAULT';
        const client = new MongoClient(uri);
        await client.connect();
        return client.db('admin'); // Retorna la base de datos que usarás
      },
    },
  ],
})
export class AppModule {}
