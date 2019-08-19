import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModuleOptions } from 'nestjs-redis';
import { RmqOptions } from '@nestjs/microservices';

export interface IConfig {
  port: number;

  typeorm: TypeOrmModuleOptions;

  redis: RedisModuleOptions;

  rabbit: RmqOptions;
}
