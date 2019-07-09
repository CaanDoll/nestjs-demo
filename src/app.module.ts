import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrderModule } from '@module/order/index.module';
import { ConfigService } from 'king/config/index.service';
import { ConfigModule } from 'king/config/index.module';
import { opSessionMiddlewares, ucSessionMiddlewares } from 'king/middleware/session.middleware';
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
