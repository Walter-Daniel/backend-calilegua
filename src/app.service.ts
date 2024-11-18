import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('MONGO') private dbMongo: Db,
    @Inject(config.KEY) private configServ: ConfigType<typeof config>,
    // @Inject('PG') private clientPg: Client,
  ) {}

  getApiKey(): string {
    const apikey = this.configServ.apiKey;
    const dbName = this.configServ.database.name;
    const dbport = this.configServ.database.port;
    return `La llave de la aplicación es: ${apikey}, el nombre y el puerto de la base de son : ${dbName} y ${dbport}`;
  }

  async getTasks() {
    const taskCollection = this.dbMongo.collection('tasks');
    const tasks = await taskCollection.find().toArray();
    return tasks.map((task) => ({
      ...task,
      _id: task._id.toString(),
    }));
  }
}
