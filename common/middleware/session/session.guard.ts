import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const redisServiceClient = this.redisService.getClient();
    const key = request.headers.token;
    if (!key) {
      throw new UnauthorizedException();
    }
    const userStr = await redisServiceClient.get(key);
    if (!userStr) {
      throw new UnauthorizedException();
    }
    redisServiceClient.expire(key, 24 * 60 * 60); // 异步刷新session时间，默认是一天，可以写常量与登录颁发时效一致
    request.user = JSON.parse(userStr);
    return true;
  }
}
