import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { IResponse } from '../base/controller';

export class BizFailedException extends HttpException {
  constructor(data: IResponse<any>) {
    super(data, HttpStatus.OK);
  }
}

@Catch(BizFailedException)
export class BizFailedExceptionFilter implements ExceptionFilter {
  catch(data: IResponse<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response
      .status(200)
      .json(data);
  }
}
