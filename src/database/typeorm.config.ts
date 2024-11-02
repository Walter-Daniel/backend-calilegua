import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

dotenv.config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('TYPEORM_HOST'),
  port: configService.get('TYPEORM_PORT'),
  username: configService.get('TYPEORM_USER'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get('TYPEORM_DATABASE'),
  entities: [
    path.resolve(__dirname, '..') + '/**/entities/*.ts',
    path.resolve(__dirname, '..') + '/**/entities/*.js'
  ],
  migrations: [
    path.resolve(__dirname, '..') + '/**/migrations/*.ts',
    path.resolve(__dirname, '..') + '/**/migrations/*.js',
  ],
  migrationsTableName: 'migrations',
});
