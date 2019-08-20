import {
  BaseController,
} from '@common/base/base.controller';
import { LoggerInterceptor } from '@common/middleware/logger/logger.interceptor';
import { SessionGuard } from '@common/middleware/session/session.guard';
import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import {
  OrderService,
} from './order.service';
import { ClientGrpc, Client } from '@nestjs/microservices';
import { BizFailedException } from '@common/middleware/biz-failed/biz-failed.exception';
import { BizFailedCodeEnum } from '../../biz-failed/biz-failed.enum';
import { grpcOptions } from '@micro-service-user/grpc/grpc.options';
import { IUserGrpcInterface } from '@micro-service-user/module/user/user.interface';
import { IOrderInterface } from './order.interface';
import { CreateDto, IndexDto } from './order.dto';

@Controller('/api/v1/orders')
@ApiUseTags('order')
@ApiBearerAuth()
export class OrderController extends BaseController implements IOrderInterface,OnModuleInit{
  @Client(grpcOptions)
  userGrpcClient: ClientGrpc;

  userGrpcService: IUserGrpcInterface;

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
  async index(@Query() query: IndexDto){
    const res = await this.orderService.index(query);
    return this.successPageData(res);
  }

  @Post('/')
  // @UseGuards(SessionGuard)
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({ title: '订单创建' })
  async create(@Body() body: CreateDto){
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

}
