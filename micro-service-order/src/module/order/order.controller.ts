import {
  BaseController,
  IPageResponse,
} from '../../../../common/base/base.controller';
import { LoggerInterceptor } from '../../../../common/middleware/logger/logger.interceptor';
import { SessionGuard } from '../../../../common/middleware/session/session.guard';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import {
  IndexDto,
} from './order.dto';
import { IndexResult } from './order.result';
import {
  OrderService,
} from './order.service';

@Controller('/api/v1/roles')
@ApiUseTags('role')
@ApiBearerAuth()
export class OrderController extends BaseController {
  constructor(private readonly orderOpService: OrderService) {
    super();
  }

  @Get('/')
  @UseGuards(SessionGuard)
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({ title: '角色列表查询' })
  async opIndex(@Query() query: IndexDto): Promise<IPageResponse<IndexResult>> {
    const res = await this.orderOpService.opIndex(query);
    return this.successPageData(res);
  }
}
