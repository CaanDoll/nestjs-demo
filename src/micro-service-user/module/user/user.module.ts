import { IntegrationModule } from '../../integration/index.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import {  } from './user.model';
import { OrderMsService, OrderOpService, OrderUcService } from './user.service';

@Module({
  imports: [
    IntegrationModule,
    TypeOrmModule.forFeature([ Order ]),
  ],
  controllers: [ UserController ],
  providers: [ OrderMsService, OrderOpService, OrderUcService ],
})
export class OrderModule {}
