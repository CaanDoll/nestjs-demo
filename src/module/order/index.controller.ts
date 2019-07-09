import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './index.service';
import { OpIndexDto } from './index.dto';
import { BaseController, IPageResponse } from 'king/base/controller';
import { OpSessionGuard } from 'king/middleware/session.guard';
import { SessionUser } from 'king/middleware/session.decorator';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

@Controller('/api/v1')
export class OrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('op/orders')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '订单查询' })
  async opIndex(@Query() query: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(query);
    return this.successPageData(res);
  }

  @Get('op/orders/download')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '订单导出' })
  async opDownload(@Query() query: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(query);
    return this.successPageData(res);
  }

  @Get('op/orders/:orderId')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '订单导出' })
  async opShow(@Param() param: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(param);
    return this.successPageData(res);
  }

  @Post('op/orders')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '创建订单' })
  async opCreate(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Get('op/orders/check-precondition')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '校验前置条件' })
  async opCheckPrecondition(@Query() query: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(query);
    return this.successPageData(res);
  }

  @Post('op/orders/:orderId/refunds')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '订单退款' })
  async opRefunds(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/adjust-price')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '修改价格' })
  async opAdjustPrice(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/manager')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '更新客户经理' })
  async opManager(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/pay')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '支付' })
  async opPay(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/refunds')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '又是退款' })
  async opRefunds1(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/expired-reason')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '过期理由' })
  async opExpiredReason(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/renewal')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '续费' })
  async opRenewal(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/upgrade')
  @UseGuards(OpSessionGuard)
  @ApiUseTags('order')
  @ApiOperation({ title: '升级' })
  async opUpgrade(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }
}
