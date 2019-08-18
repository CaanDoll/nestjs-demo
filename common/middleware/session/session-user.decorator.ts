import { CanActivate, createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

export const SessionUser = createParamDecorator((data, req) => {
  return req.user;
});
