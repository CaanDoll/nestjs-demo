import { Controller, Get, Query } from '@nestjs/common';
import OrderService from './index.service';
import { OpIndexDto } from './index.dto';
import BaseController, { IPageResponse } from 'king/base/controller';

@Controller('/api/v1')
export default class OrderController extends BaseController{
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('op/orders')
  async opIndex(@Query() query: OpIndexDto): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(query);
    return this.successPageData(res);
  }
}
