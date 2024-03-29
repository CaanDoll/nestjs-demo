import {
  BaseController,
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
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import {
  IndexDto,
  LoginDto,
} from './user.dto';
import {
  UserService,
} from './user.service';
import { EventPattern, GrpcMethod } from '@nestjs/microservices';
import { IUserInterface } from './user.interface';
import { IndexResult, LoginResult } from './user.result';
import { SessionUser } from '@common/middleware/session/session-user.decorator';

@Controller('/api/v1/users')
@ApiUseTags('user')
@ApiBearerAuth()
export class UserController extends BaseController implements IUserInterface{
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post('/login')
  @UseInterceptors(LoggerInterceptor)
  @ApiOperation({ title: '登录' })
  @ApiOkResponse({type: LoginResult})
  async login(@Body() body: LoginDto){
    const token = await this.userService.login(body);
    return this.success({
      token,
    });
  }

  @Get('/')
  @UseInterceptors(LoggerInterceptor)
  @UseGuards(SessionGuard)
  @ApiOperation({ title: '用户列表查询' })
  @ApiOkResponse({type: IndexResult})
  async index(@Query() query: IndexDto){
    const res = await this.userService.index(query);
    return this.successPageData(res);
  }

  @GrpcMethod('UserService', 'ShowStatus')
  async showStatus(data) {
    return await this.userService.showStatus(data);
  }

  @EventPattern('send_email')
  async sendEmail(data){
    console.log(data);
  }
}
