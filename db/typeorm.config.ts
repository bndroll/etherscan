import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

const dataSourceHost = configService.get('NODE_ENV') === 'development' ? '127.0.0.1' : 'exchanger-postgres'
export default new DataSource({
  type: 'postgres',
  host: dataSourceHost,
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USERNAME'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  synchronize: configService.get('NODE_ENV') === 'development',
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});