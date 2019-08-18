import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationModule } from '../../integration/index.module';
import { OrderController } from './order.controller';
import { OrderModel } from './order.model';
import { OrderService } from './order.service';

@Module({
  imports: [
    IntegrationModule,
    TypeOrmModule.forFeature([ OrderModel ]),
  ],
  controllers: [ OrderController ],
  providers: [ OrderService ],
})
export class OrderModule {}
