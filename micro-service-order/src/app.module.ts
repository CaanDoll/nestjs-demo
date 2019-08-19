import { ConfigModule } from '@common/config/config.module';
import { ConfigService } from '@common/config/config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule, RedisModuleOptions } from 'nestjs-redis';
import { OrderModule } from './module/order/order.module';

@Module({
  imports: [
    ConfigModule,
    OrderModule,
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
