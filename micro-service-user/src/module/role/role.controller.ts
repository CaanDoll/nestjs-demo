import {
  BaseController,
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
  RoleService,
} from './role.service';
import { IRoleInterface } from './role.interface';
import { IndexDto } from './role.dto';

@Controller('/api/v1/roles')
@ApiUseTags('role')
@ApiBearerAuth()
export class RoleController extends BaseController implements IRoleInterface{
  constructor(private readonly roleService: RoleService) {
    super();
  }

  @Get('/')
  @UseGuards(SessionGuard)
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({ title: '角色列表查询' })
  async index(@Query() query: IndexDto){
    const res = await this.roleService.index(query);
    return this.successPageData(res);
  }
}
