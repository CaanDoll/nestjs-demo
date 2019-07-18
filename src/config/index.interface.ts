import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { RedisModuleOptions } from 'nestjs-redis';
import { ElasticsearchTransportOptions } from 'winston-elasticsearch';

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

export class Config {
  @IsNotEmpty()
  @IsInt()
  port: number;

  @IsNotEmpty()
  typeorm: TypeOrmModuleOptions;

  @IsNotEmpty()
  redis: RedisModuleOptions;

  @IsNotEmpty()
  integration: Integration;

  @IsOptional()
  elk?: ElasticsearchTransportOptions;
}
