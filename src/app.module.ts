import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrderModule } from '@module/order/index.module';
import { ConfigService } from 'king/config/index.service';
import { ConfigModule } from 'king/config/index.module';

@Module({
  imports: [
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
export class AppModule{}
