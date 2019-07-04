import { Controller, Get } from '@nestjs/common';
import OrderService from './index.service';

@Controller('/api/v1/app')
export default class {
  constructor(private readonly orderService: OrderService) {}

  @Get('hello')
  getHello(): string {
    return this.orderService.getHello();
  }
}
