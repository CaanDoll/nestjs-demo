import { HttpException, HttpStatus } from '@nestjs/common';

export class BizFailedException extends HttpException {
  constructor(bizFailedCode: string) {
    super(bizFailedCode, HttpStatus.OK);
  }
}
