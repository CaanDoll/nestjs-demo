import { Injectable } from '@nestjs/common';

@Injectable()
export default class {
  getHello(): string {
    return 'Hello World!';
  }
}
