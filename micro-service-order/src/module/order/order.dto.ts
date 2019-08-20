import { BasePageDto } from '@common/base/base.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class IndexDto extends BasePageDto {
  @IsNotEmpty()
  @ApiModelProperty({
    description: '用户uuid',
    example: '50efab30-6fe1-4a0f-9a43-88f6325e9522'
  })
  @IsString()
  userUuid: string;
}

export class CreateDto {
  @IsNotEmpty()
  @ApiModelProperty({
    description: '用户uuid',
    example: '50efab30-6fe1-4a0f-9a43-88f6325e9522'
  })
  @IsUUID()
  userUuid: string;

  @IsNotEmpty()
  @ApiModelProperty({
    description: '总金额',
    example: 1
  })
  @IsInt()
  @Min(1)
  totalMount: number;

  @IsOptional()
  @ApiModelPropertyOptional({
    description: '描述',
    example: ''
  })
  @IsString()
  desc?: string;
}
