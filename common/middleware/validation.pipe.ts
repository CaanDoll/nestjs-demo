import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ENODE_ENV } from '../config/config.service';
import { Logger } from '../logger/logger.service';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    console.log('validate');
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      Logger.warn(errors, 'ValidationPipe');
      throw new BadRequestException(`${process.env.NODE_ENV !== ENODE_ENV.production ? errors : 'Validation failed'}`);
    }
    return object;
  }

  private toValidate(metatype): boolean {
    const types = [ String, Boolean, Number, Array, Object ];
    return !types.find(type => metatype === type);
  }
}
