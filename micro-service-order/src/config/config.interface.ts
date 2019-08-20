import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModuleOptions } from 'nestjs-redis';

export interface IConfig {
  port: number;

  typeorm: TypeOrmModuleOptions;

  redis: RedisModuleOptions;
}
