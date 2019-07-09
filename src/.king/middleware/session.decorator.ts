import { createParamDecorator } from '@nestjs/common';
export const SessionUser = createParamDecorator((data, req) => {
  return req.user;
});
