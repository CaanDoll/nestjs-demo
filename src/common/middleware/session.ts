import { CanActivate, createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import { RedisService } from 'nestjs-redis';
import * as path from 'path';
import { ENODE_ENV } from '../config/index.service';
const localOpUser = fs.readFileSync(path.join(__dirname, '../data/local-op-user.json'));
const localUcUser = fs.readFileSync(path.join(__dirname, '../data/local-uc-user.json'));

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
    if (!key) {
      if (!process.env.NODE_ENV || process.env.NODE_ENV === ENODE_ENV.local) { // 本地用localUser数据调试
        request.user = cookieKey === CookieKey.opsid ? localOpUser : localUcUser;
        return true;
      } else {
        throw new UnauthorizedException();
      }
    }
    const userStr = await redisServiceClient.get(key);
    if (!userStr) {
      throw new UnauthorizedException();
    }
    redisServiceClient.expire(key, 24 * 60 * 60); // 异步刷新session时间，默认是一天，可以写常量与登录颁发时效一致
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
