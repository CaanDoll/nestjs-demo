import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '../../logger/logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
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
