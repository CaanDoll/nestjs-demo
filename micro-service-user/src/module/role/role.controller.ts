import {
  BaseController,
  IPageResponse,
} from '@common/base/base.controller';
import { LoggerInterceptor } from '@common/middleware/logger/logger.interceptor';
import { SessionGuard } from '@common/middleware/session/session.guard';
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
} from './role.dto';
import { IndexResult } from './role.result';
import {
  RoleService,
} from './role.service';

@Controller('/api/v1/roles')
@ApiUseTags('role')
@ApiBearerAuth()
export class RoleController extends BaseController {
  constructor(private readonly orderOpService: RoleService) {
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
