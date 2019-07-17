import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '../logger/index.service';

export const startLoggerMiddleware = async (req, res, next) => {
  Logger.log(`${req.method} ${req.url}`, 'StartLoggerMiddleware');
  next();
};

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    return next
      .handle()
      .pipe(
        tap(responseBody => {
          let responseBodyStr;
          try {
            responseBodyStr = JSON.stringify(responseBody);
          } catch (e) {
            responseBodyStr = '';
          }
          Logger.log(`${request.method} ${request.url} ${responseBodyStr} ${Date.now() - now}ms`, 'LoggingInterceptor');
        }),
      );
  }
}
