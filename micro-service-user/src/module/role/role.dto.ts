import { BasePageDto } from '@common/base/base.dto';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class IndexDto extends BasePageDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  name?: string;
}
