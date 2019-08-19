import {
  BaseController,
} from '@common/base/base.controller';
import { LoggerInterceptor } from '@common/middleware/logger/logger.interceptor';
import { SessionGuard } from '@common/middleware/session/session.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  OnModuleInit,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import {
  OrderService,
} from './order.service';
import { ClientGrpc, Client, ClientRMQ } from '@nestjs/microservices';
import { BizFailedException } from '@common/middleware/biz-failed/biz-failed.exception';
import { BizFailedCodeEnum } from '../../biz-failed/biz-failed.enum';
import { userGrpc } from '@micro-service-user/module/user/user.grpc';
import { IUserGrpcInterface } from '@micro-service-user/module/user/user.interface';
import { IOrderInterface } from './order.interface';

@Controller('/api/v1/orders')
@ApiUseTags('order')
@ApiBearerAuth()
export class OrderController extends BaseController implements IOrderInterface,OnModuleInit{
  @Client(userGrpc)
  userGrpcClient: ClientGrpc;

  userGrpcService: IUserGrpcInterface;

  userRmqClient: ClientRMQ;

  constructor(private readonly orderService: OrderService) {
    super();
  }

  onModuleInit() {
    this.userGrpcService = this.userGrpcClient.getService<IUserGrpcInterface>('UserService');
  }

  @Get('/')
  @UseGuards(SessionGuard)
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({ title: '订单列表查询' })
  async index(@Query() query){
    const res = await this.orderService.index(query);
    return this.successPageData(res);
  }

  @Post('/')
  @UseGuards(SessionGuard)
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({ title: '订单创建' })
  async create(@Body() body){
    const user = await this.userGrpcService.showStatus({
        userUuid: body.userUuid,
      // @ts-ignore
    }).toPromise();
    if(!user || !user.status){
      throw new BizFailedException(BizFailedCodeEnum.USER_NOT_EXISTS_OR_DISABLE);
    }
    await this.orderService.create(body);
    return this.success();
  }

  @Delete('/:uuid')
  @UseGuards(SessionGuard)
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({ title: '订单删除' })
  async destroy(@Param() param){
    await this.orderService.destroy(param);
    const a = await this.userRmqClient.publish('mail',);

    return this.success();
  }
}
