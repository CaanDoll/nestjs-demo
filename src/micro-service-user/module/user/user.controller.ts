import {
  BaseController,
  IPageResponse,
  IResponse,
} from '@common/base/base.controller';
import { LoggingInterceptor } from '@common/middleware/logger/logger.interceptor';
import {
  OpSessionGuard,
  SessionUser,
  UcSessionGuard,
} from '@common/middleware/session/session-user.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import {
  MsCreateDto,
  OpCheckPreconditionDto,
  OpCreateDto,
  OpIndexByOrderIdsDto,
  OpIndexDto,
  OpShowDto,
  UcCountByOrderStateDto,
  UcIndexDto,
  UcInvoiceTotalAmountDto,
  UcPaidProductCountsDto,
  UcPayDto,
  UcShowDto,
  UcUpdateStateDto,
} from './user.dto';
import {
  userService,
} from './user.service';

@Controller('/api/v1/users')
@ApiUseTags('user')
@ApiBearerAuth()
export class UserController extends BaseController {
  constructor(private readonly userService: userService) {
    super();
  }

  @Post('/login')
  @ApiOperation({ title: '登录' })
  async login(@Body() body: OpIndexDto): Promise<IPageResponse> {
    const res = await this.userService.login(query);
    return this.successPageData(res);
  }


}
