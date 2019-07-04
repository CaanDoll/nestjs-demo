import { Module } from '@nestjs/common';
import Controller from './index.controller';
import Service from './index.service';

@Module({
  imports: [],
  controllers: [Controller],
  providers: [Service],
})
export default class{}
