import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './index.controller';
import { Order } from './index.model';
import { OrderService } from './index.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Order ]),
    HttpModule,
  ],
  controllers: [ OrderController ],
  providers: [ OrderService ],
})
export class OrderModule {}
