import { IntegrationModule } from '../../integration/index.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMsController, OrderOpController, OrderUcController } from './role.controller';
import { Order } from './role.model';
import { OrderMsService, OrderOpService, OrderUcService } from './role.service';

@Module({
  imports: [
    IntegrationModule,
    TypeOrmModule.forFeature([ Order ]),
  ],
  controllers: [ OrderMsController, OrderOpController, OrderUcController ],
  providers: [ OrderMsService, OrderOpService, OrderUcService ],
})
export class OrderModule {}
