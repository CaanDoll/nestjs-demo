import { BizFailedExceptionFilter } from '@common/http/biz-failed';
import { Logger } from '@common/logger/index.service';
import { startLoggerMiddleware } from '@common/middleware/logger';
import { ValidationPipe } from '@common/util/validation-pipe';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

// TODO log4js elk
// TODO sentry
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      logger: new Logger(),
    },
  );

  const configService = app
    .get('ConfigService');
  const SWAGGER_PATH = 'swagger';
  const IS_PRODUCTION = configService.get('env') === 'production';

  if (!IS_PRODUCTION) {
    const options = new DocumentBuilder()
      .setTitle(configService.get('npm_package_name'))
      .setDescription(configService.get('npm_package_description'))
      .setVersion(configService.get('npm_package_version'))
      .addBearerAuth('token', 'header')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_PATH, app, document);
  }

  app.use(startLoggerMiddleware); // 全局http访问初始日志
  app.use(cookieParser()); // 全局cookie解析
  app.useGlobalPipes(new ValidationPipe()); // 全局接口参数验证+参数转换
  app.useGlobalFilters(new BizFailedExceptionFilter()); // 全局捕获请求其他服务接口时code不为200的业务失败情况

  const port = configService.get('port');
  await app.listen(port);
  Logger.log(`App listening on ${port}, env: ${configService.get('env')}`, 'NestApplication');
  if (!IS_PRODUCTION)Logger.log(`Swagger doc setup http://127.0.0.1:${port}/${SWAGGER_PATH}`, 'NestApplication');
}
bootstrap();
