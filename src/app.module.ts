import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderModule from '@module/order/index.module';
import Config from './config/index.service';

@Module({
  imports: [
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
