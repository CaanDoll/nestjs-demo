import { BasePageDto } from '@common/base/base.dto';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @ApiModelProperty({
    description: '账户名',
    example: 'test_username'
  })
  @IsString()
  username: string;

  @IsNotEmpty()
  @ApiModelProperty({
    description: '密码',
    example: 'test_password'
  })
  @IsString()
  password: string;
}

export class IndexDto extends BasePageDto {
  @IsOptional()
  @ApiModelPropertyOptional({
    description: '账户名模糊',
    example: 'test_u'
  })
  @IsString()
  username?: string;
}

export class ShowStatusDto {
  userUuid: string;
}
