import { ApiModelProperty } from '@nestjs/swagger';

export class LoginResult {
  @ApiModelProperty({
    description:'令牌',
    example: 'fjksdjfke',
  })
  token: string;
}

export class IndexResult{
  @ApiModelProperty({
    description:'账户名',
    example: 'test_username',
  })
  username: string;
  @ApiModelProperty({
    description:'状态',
    example: 1,
  })
  status: number;
}

export class ShowStatusResult {
  status: number;
}
