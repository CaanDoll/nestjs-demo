import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModuleOptions } from 'nestjs-redis';

export class Integration {
  product: string;
  customer: string;
  finance: string;
  officer: string;
  richman: string;
  mailboy: string;
  actions: string;
  knight: string;
  openapi: string;
  uploadUrl: string;
}

export interface IConfig {
  port: number;

  typeorm: TypeOrmModuleOptions;

  redis: RedisModuleOptions;

  integration: Integration;
}
