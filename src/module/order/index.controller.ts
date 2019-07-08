import { Body, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './index.service';
import { OpIndexDto } from './index.dto';
import { BaseController, IPageResponse } from 'king/base/controller';
import { SessionGuard } from 'king/middleware/session.guard';
import { SessionUser } from 'king/middleware/session.decorator';
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

  @Get('op/orders/download')
  @UseGuards(SessionGuard)
  @ApiUseTags('order')
  @ApiOperation({title: '订单导出'})
  async opDownload(@Query() query: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    console.log(user);
    const res = await this.orderService.opIndex(query);
    return this.successPageData(res);
  }

  @Get('op/orders/:orderId')
  @UseGuards(SessionGuard)
  @ApiUseTags('order')
  @ApiOperation({title: '订单导出'})
  async opShow(@Param() param: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(param);
    return this.successPageData(res);
  }

  @Get('op/orders')
  @UseGuards(SessionGuard)
  @ApiUseTags('order')
  @ApiOperation({title: '创建订单'})
  async opCreate(@Body() body: OpIndexDto, @SessionUser() user: object): Promise<IPageResponse> {
    const res = await this.orderService.opIndex(body);
    return this.successPageData(res);
  }
}


/*
  .post("/v1/op/files", fileController.addFile)
  .post("/v1/op/check-precondition", orderController.checkPrecondition)
  .post("/v1/op/orders/:orderId/refunds", orderController.opAddOrderRefund)

  .patch("/v1/op/orders/:orderId/adjust-price", orderController.opUpdateOrderAdjustPrice)
  .patch("/v1/op/orders/:orderId/manager", orderController.opUpdateOrderManager)
  .patch("/v1/op/orders/:orderId/pay", orderController.opAddOrderPay)
  .patch("/v1/op/orders/:orderId/refunds", orderController.opUpdateOrderRefund)
  .patch("/v1/op/orders/:orderId/expired-reason", orderController.updateExpiredReanson)
  .patch("/v1/op/orders/:orderId/:part", orderController.opUpdateOrder)

  .patch("/v1/op/orders/:orderId/renewal", orderController.opUpdateOrderRenewal)
  .patch(
    "/v1/op/orders/:orderId/upgrade",
    orderController.opUpdateOrderUpgrade
  );
*
*
* */
