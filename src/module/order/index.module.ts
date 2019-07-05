import { Module } from '@nestjs/common';
import Controller from './index.controller';
import Service from './index.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from './index.model';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [Controller],
  providers: [Service],
})
export default class OrderModule{}
