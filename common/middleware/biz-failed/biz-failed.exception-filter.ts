import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { IResponse } from '../../base/base.controller';
import { ConfigService } from '../../config/index.service';
import { BizFailedException } from './biz-failed.exception';
const configService = ConfigService.getInstance();

@Catch(BizFailedException)
export class BizFailedExceptionFilter implements ExceptionFilter {
  bizFailedDesc: any;
  constructor(bizFailedDesc) {
    this.bizFailedDesc = bizFailedDesc;
  }
  catch(bizFailedCode: string, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const body: IResponse<any> = {
      code: `${configService.get('npm_package_code')}${bizFailedCode}`,
      message: this.bizFailedDesc[bizFailedCode],
    };
    response
      .status(200)
      .json(body);
  }
}
