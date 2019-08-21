import { ApiModelProperty } from '@nestjs/swagger';

export class IndexResult{
  @ApiModelProperty({
    description:'名称',
    example: 'test_role',
  })
  name: string;
}
