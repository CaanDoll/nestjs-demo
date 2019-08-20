import { BasePageDto } from '@common/base/base.dto';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class IndexDto extends BasePageDto {
  @IsOptional()
  @ApiModelPropertyOptional({
    description: '角色名称模糊',
    example: 'test_r'
  })
  @IsString()
  name?: string;
}
