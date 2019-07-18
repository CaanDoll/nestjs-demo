import { CanActivate, createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

enum CookieKey {
  opsid= 'opsid',
  ucsid= 'ucsid',
}

@Injectable()
class Session {
  constructor(
    private readonly redisService: RedisService,
  ) {}
  protected async guard(context: ExecutionContext, cookieKey: CookieKey) {
    const request = context.switchToHttp().getRequest();
    const redisServiceClient = this.redisService.getClient();
    const key = request.cookies[cookieKey] || request.headers.token; // sessionId 可以从cookie上某个值拿，也可以从header上token拿，兼容未来移动端与swagger
    const userStr = await redisServiceClient.get(key);
    if (!userStr) {
      throw new UnauthorizedException();
    }
    redisServiceClient.expire(key, 24 * 60 * 60);
    const { passport: { user } } = JSON.parse(userStr);
    request.user = user;
    return true;
  }
}

export class OpSessionGuard extends Session implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.guard(context, CookieKey.opsid);
  }
}

export class UcSessionGuard extends Session implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    return await this.guard(context, CookieKey.ucsid);
  }
}

export const SessionUser = createParamDecorator((data, req) => {
  return req.user;
});
