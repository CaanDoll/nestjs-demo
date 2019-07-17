import { BaseController, IPageResponse, IResponse } from '@common/base/controller';
import { LoggingInterceptor } from '@common/middleware/logger';
import { OpSessionGuard, SessionUser, UcSessionGuard } from '@common/middleware/session';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import {
  OpCheckPreconditionDto,
  OpCreateDto,
  OpIndexByOrderIdsDto,
  OpIndexDto,
  OpShowDto, UcCountByOrderStateDto, UcIndexDto, UcInvoiceTotalAmountDto, UcPaidProductCountsDto,
  UcPayDto, UcShowDto, UcUpdateStateDto,
} from './index.dto';
import { OrderOpService, OrderService, OrderUcService } from './index.service';

@Controller('/api/v1')
@ApiUseTags('order')
@ApiBearerAuth()
export class OrderController extends BaseController {
  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('/ms/orders')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '创建订单' })
  async ucCreate(@Body() body: OpCreateDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderService.create(body, user);
    return this.success();
  }
}

@Controller('/api/v1')
@ApiUseTags('order-op')
@ApiBearerAuth()
export class OrderOpController extends BaseController {
  constructor(private readonly orderOpService: OrderOpService) {
    super();
  }

  @Get('/op/orders')
  @UseGuards(OpSessionGuard)
  @UseInterceptors(LoggingInterceptor)
  @ApiOperation({ title: '订单列表查询' })
  async opIndex(@Query() query: OpIndexDto): Promise<IPageResponse> {
    const res = await this.orderOpService.opIndex(query);
    return this.successPageData(res);
  }

  @Get('/op/orders/download')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '订单导出' })
  async opDownload(@Query() query: OpIndexDto): Promise<string> {
    const res = await this.orderOpService.opIndex(query);
    return this.successXlsx([], res, '订单');
  }

  @Get('/op/orders-by-order-ids')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '按订单号批量查询' })
  async opIndexByOrderIds(@Query() query: OpIndexByOrderIdsDto): Promise<IResponse> {
    const res = await this.orderOpService.opIndexByOrderIds(OpIndexByOrderIdsDto);
    return this.success(res);
  }

  @Get('/op/orders/:orderId')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '订单详情' })
  async opShow(@Param() param: OpShowDto): Promise<IResponse> {
    const res = await this.orderOpService.opShow(param);
    return this.success(res);
  }

  @Post('/op/orders')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '创建订单' })
  async opCreate(@Body() body: OpCreateDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderOpService.opCreate(body, user);
    return this.success();
  }

  @Post('/op/check-precondition')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '校验前置条件' })
  async opCheckPrecondition(@Body() body: OpCheckPreconditionDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderOpService.opCheckPrecondition(body);
    return this.success(res);
  }

  @Post('op/orders/:orderId/refunds')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '创建订单退款' })
  async opRefunds(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderOpService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/adjust-price')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '修改价格' })
  async opAdjustPrice(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderOpService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/manager')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '更新客户经理' })
  async opManager(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderOpService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/pay')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '支付' })
  async opPay(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderOpService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/refunds')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '退款审核' })
  async opRefundsAudit(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderOpService.opIndex(body);
    return this.successPageData(res);
  }

  @Patch('op/orders/:orderId/expired-reason')
  @UseGuards(OpSessionGuard)
  @ApiOperation({ title: '过期理由' })
  async opExpiredReason(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IResponse> {
    const res = await this.orderOpService.opIndex(body);
    return this.successPageData(res);
  }

}

@Controller('/api/v1')
@ApiUseTags('order-uc')
@ApiBearerAuth()
export class OrderUcController extends BaseController {
  constructor(private readonly orderUcService: OrderUcService) {
    super();
  }

  @Post('/uc/orders')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '创建订单' })
  async ucCreate(@Body() body: OpCreateDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucCreate(body, user);
    return this.success();
  }

  @Post('/uc/orders/pay')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '支付订单' })
  async ucPay(@Body() body: UcPayDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucPay(body, user);
    return this.success();
  }

  @Get('/uc/orders')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '查询订单' })
  async ucIndex(@Query() query: UcIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderUcService.ucIndex(query, user);
    return this.successPageData(res);
  }

  @Get('/uc/export-orders/download')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '查询订单' })
  async ucDownload(@Query() query: UcIndexDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucIndex(query, user);
    return this.success();
  }

  @Get('/uc/orders/:orderId')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '查询单笔订单详情' })
  async ucShow(@Param() param: UcShowDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucShow(param.orderId, user);
    return this.success();
  }

  @Get('/uc/invoice-orders')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '查询可开票订单' })
  async ucInvoiceOrders(@Param() param: UcShowDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucShow(param.orderId, user);
    return this.success();
  }

  @Get('/uc/orders-by-ids')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '通过多笔订单流水查询订单' })
  async ucOrdersByIds(@Param() param: UcShowDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucShow(param.orderId, user);
    return this.success();
  }

  @Get('/uc/count-by-order-state')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '通过订单状态获取订单数量' })
  async ucCountByOrderState(@Query() query: UcCountByOrderStateDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucCountByOrderState(query, user);
    return this.success();
  }

  @Get('/uc/invoice-total-amount')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '获取可开票总金额' })
  async ucInvoiceTotalAmount(@Query() query: UcInvoiceTotalAmountDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucInvoiceTotalAmount(query, user);
    return this.success();
  }

  @Get('/uc/paid-product-counts')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '获取已有订单产品数量' })
  async ucPaidProductCounts(@Query() query: UcPaidProductCountsDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucPaidProductCounts(query, user);
    return this.success();
  }

  @Patch('/uc/orders/:orderId/state')
  @UseGuards(UcSessionGuard)
  @ApiOperation({ title: '更新订单状态' })
  async ucUpdateState(@Body() body: UcUpdateStateDto, @SessionUser() user: object): Promise<IResponse> {
    await this.orderUcService.ucUpdateState(body, user);
    return this.success();
  }
}
