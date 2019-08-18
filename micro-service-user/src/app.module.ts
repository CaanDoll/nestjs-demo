import { ConfigModule } from '@common/config/index.module';
import { ConfigService } from '@common/config/index.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { RoleModule } from './module/role/role.module';

@Module({
  imports: [
    ConfigModule,
    RoleModule,
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => configService.get('typeorm') as TypeOrmModuleOptions,
    }),
    RedisModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => configService.get('redis') as RedisModuleOptions,
    }),
  ],
})
export class AppModule {}
