import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrderModule } from '@module/order/index.module';
import { ConfigService } from 'king/config/index.service';
import { ConfigModule } from 'king/config/index.module';
import { opSessionMiddlewares, ucSessionMiddlewares } from 'king/middleware/session.middleware';

@Module({
  imports: [
    ConfigModule,
    OrderModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => (configService.get('orm') as TypeOrmModuleOptions),
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  private readonly redisConfig: object;
  constructor(config: ConfigService) {
    this.redisConfig = config.get('redis');
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(...ucSessionMiddlewares(this.redisConfig))
      .forRoutes('/api/v1/uc');
    consumer
      .apply(...opSessionMiddlewares(this.redisConfig))
      .forRoutes('/api/v1/op');
  }
}
