import { BaseController, IPageResponse, IResponse } from '@common/base/controller';
import { LoggingInterceptor } from '@common/middleware/logger';
import { OpSessionGuard, SessionUser } from '@common/middleware/session';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { OpCheckPreconditionDto, OpCreateDto, OpIndexByOrderIdsDto, OpIndexDto, OpShowDto } from './index.dto';
import { OrderService } from './index.service';

@Controller('/api/v1')
@ApiUseTags('order')
@ApiBearerAuth()
export class OrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Get('/op/orders')
  @UseGuards(OpSessionGuard)
  @UseInterceptors(LoggingInterceptor)
  @ApiOperation({ title: '订单列表查询' })
  async opIndex(@Query() query: OpIndexDto): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(query);
    return this.successPageData(res);
  }

  @Get('/op/orders/download')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '订单导出' })
  async opDownload(@Query() query: OpIndexDto): Promise<string> {
    const res = await this.orderService.opIndex(query);
    return this.successXlsx([], res, '订单');
  }

  @Get('/op/orders-by-order-ids')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '按订单号批量查询' })
  async opIndexByOrderIds(@Query() query: OpIndexByOrderIdsDto): Promise<IResponse> {
    const res = await this.orderService.opIndexByOrderIds(OpIndexByOrderIdsDto);
    return this.success(res);
  }

  @Get('/op/orders/:orderId')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '订单详情' })
  async opShow(@Param() param: OpShowDto): Promise<IResponse> {
    const res = await this.orderService.opShow(param);
    return this.success(res);
  }

  @Post('/op/orders')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '创建订单' })
  async opCreate(@Body() body: OpCreateDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderService.opCreate(body, user);
    return this.success();
  }

  @Post('/op/check-precondition')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '校验前置条件' })
  async opCheckPrecondition(@Body() body: OpCheckPreconditionDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderService.opCheckPrecondition(body);
    return this.success(res);
  }

  @Post('op/orders/:orderId/refunds')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '订单退款' })
  async opRefunds(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/adjust-price')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '修改价格' })
  async opAdjustPrice(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/manager')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '更新客户经理' })
  async opManager(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/pay')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '支付' })
  async opPay(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/refunds')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '又是退款' })
  async opRefunds1(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/expired-reason')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '过期理由' })
  async opExpiredReason(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/renewal')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '续费' })
  async opRenewal(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/upgrade')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '升级' })
  async opUpgrade(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }
}
