import { BasePageDto } from '@common/base/base.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty()
  @IsString()
  password: string;
}

export class IndexDto extends BasePageDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  name?: string;
}

export class ShowStatusDto {
  userUuid: string;
}
