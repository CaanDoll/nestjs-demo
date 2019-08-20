import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ OrderModel ]),
  ],
  controllers: [ OrderController ],
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}
