import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class OpIndexDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsString()
  orderId?: string;
}
