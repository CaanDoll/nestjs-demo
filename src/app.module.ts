import { OrderModule } from '@module/order/index.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from 'king/config/index.module';
import { ConfigService } from 'king/config/index.service';
import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    ConfigModule,
    OrderModule,
    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => (configService.get('typeorm') as TypeOrmModuleOptions),
    }),
    RedisModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => configService.get('redis'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
