import { IntegrationModule } from '@integration/index.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './index.controller';
import { Order } from './index.model';
import { OrderService } from './index.service';

@Module({
  imports: [
    IntegrationModule,
    TypeOrmModule.forFeature([ Order ]),
  ],
  controllers: [ OrderController ],
  providers: [ OrderService ],
})
export class OrderModule {}
