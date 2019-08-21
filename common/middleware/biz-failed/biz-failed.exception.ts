import { HttpException, HttpStatus } from '@nestjs/common';

export class BizFailedException extends HttpException {
  constructor(bizFailedCode: number) {
    super(bizFailedCode.toString(), HttpStatus.OK);
  }
}
