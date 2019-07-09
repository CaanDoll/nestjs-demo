import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class OpSessionGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const userStr = await this.redisService.getClient().get(request.cookies.opsid);
    if (!userStr) {
      throw new UnauthorizedException();
    }
    const { passport: { user } } = JSON.parse(userStr);
    request.user = user;
    return true;
  }
}

@Injectable()
export class UcSessionGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const userStr = await this.redisService.getClient().get(request.cookies.ucsid);
    if (!userStr) {
      throw new UnauthorizedException();
    }
    const { passport: { user } } = JSON.parse(userStr);
    request.user = user;
    return true;
  }
}
