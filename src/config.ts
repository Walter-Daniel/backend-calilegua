import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        database: {
            name: process.env.POSTGRES_DB,
            port: parseInt(process.env.POSTGRES_PORT, 10),
          },
          postgres: { 
            name: process.env.POSTGRES_DB,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            password: process.env.POSTGRES_PASSWORD,
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
          },
          mysql: { 
            host: process.env.MYSQL_HOST,
            name: process.env.MYSQL_DATABASE,
            port: parseInt(process.env.MYSQL_PORT, 10),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_ROOT_PASSWORD
          },
          apiKey: process.env.API_KEY,
    };
});