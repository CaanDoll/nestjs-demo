import {createParamDecorator} from '@nestjs/common';
export const SessionUser = createParamDecorator((data, req) => {
  return {
    userName: '2528@qq.com',
  };
});
