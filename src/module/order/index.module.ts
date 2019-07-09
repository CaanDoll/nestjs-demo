import { Module } from '@nestjs/common';
import { OrderController } from './index.controller';
import { OrderService } from './index.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './index.model';

@Module({
  imports: [ TypeOrmModule.forFeature([ Order ]) ],
  controllers: [ OrderController ],
  providers: [ OrderService ],
})
export class OrderModule {}
