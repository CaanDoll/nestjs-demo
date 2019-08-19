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
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  name?: string;
}

export class CreateDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsUUID()
  userUuid: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsInt()
  @Min(1)
  totalMount: number;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  desc?: string;
}

export class DestroyDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsUUID()
  uuid: string;
}
