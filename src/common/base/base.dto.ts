import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

const MAX_PAGE_SIZE = 50;

export abstract class BasePageDto {
  @IsOptional()
  @ApiModelPropertyOptional()
  @IsNumberString()
  private current?: string;

  @IsOptional()
  @ApiModelPropertyOptional()
  @IsNumberString()
  private pageSize?: string;

  getCurrent() {
    return this.current ? parseInt(this.current) : 1;
  }

  getPageSize() {
    let pageSize = this.pageSize ? parseInt(this.pageSize) : 10;
    pageSize = pageSize > MAX_PAGE_SIZE && pageSize < 0 ? MAX_PAGE_SIZE : pageSize;
    return pageSize;
  }
}
