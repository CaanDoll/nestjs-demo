import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './index.service';
import { OpIndexDto } from './index.dto';
import { BaseController, IPageResponse } from 'king/base/controller';
import { SessionGuard } from 'king/auth/session.guard';
import { SessionUser } from 'king/auth/session.decorator';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

@Controller('/api/v1')
export class OrderController extends BaseController{
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('op/orders')
  @UseGuards(SessionGuard)
  @ApiUseTags('order')
  @ApiOperation({title: '订单查询'})
  async opIndex(@Query() query: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    console.log(user);
    const res = await this.orderService.opIndex(query);
    return this.successPageData(res);
  }
}
