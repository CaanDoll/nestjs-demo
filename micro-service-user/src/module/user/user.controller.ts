import {
  BaseController,
  IPageResponse, IResponse,
} from '@common/base/base.controller';
import { LoggerInterceptor } from '@common/middleware/logger/logger.interceptor';
import { SessionGuard } from '@common/middleware/session/session.guard';
import {
  Body,
  Controller,
  Get, Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import {
  IndexDto, LoginDto,
} from './user.dto';
import { IndexResult, LoginResult } from './user.result';
import {
  UserService,
} from './user.service';

@Controller('/api/v1/users')
@ApiUseTags('user')
@ApiBearerAuth()
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }


  @Post('/login')
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({ title: '登录' })
  async login(@Body() body: LoginDto): Promise<IResponse<LoginResult>> {
    const token = await this.userService.login(body);
    return this.success({
      token,
    });
  }

  @Get('/')
  @UseInterceptors(LoggerInterceptor)
  @UseGuards(SessionGuard)
  @ApiOperation({ title: '用户列表查询' })
  async index(@Query() query: IndexDto): Promise<IPageResponse<IndexResult>> {
    const res = await this.userService.index(query);
    return this.successPageData(res);
  }
}