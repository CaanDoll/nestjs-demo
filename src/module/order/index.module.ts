import { IntegrationModule } from '@integration/index.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController, OrderOpController, OrderUcController } from './index.controller';
import { Order } from './index.model';
import { OrderOpService, OrderService, OrderUcService } from './index.service';

@Module({
  imports: [
    IntegrationModule,
    TypeOrmModule.forFeature([ Order ]),
  ],
  controllers: [ OrderController, OrderOpController, OrderUcController ],
  providers: [ OrderService, OrderOpService, OrderUcService ],
})
export class OrderModule {}
