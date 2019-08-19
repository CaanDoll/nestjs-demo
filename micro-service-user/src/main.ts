import { ConfigService, ENODE_ENV } from '@common/config/config.service';
import { Logger } from '@common/logger/logger.service';
import { BizFailedExceptionFilter } from '@common/middleware/biz-failed/biz-failed.exception-filter';
import { startLoggerMiddleware } from '@common/middleware/logger/start-logger.middleware';
import { ValidationPipe } from '@common/middleware/validation.pipe';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { bizFailedDesc } from './biz-failed/biz-failed.enum';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      logger: new Logger(),
    },
  );

  const configService: ConfigService = app
    .get('ConfigService');
  const SWAGGER_PATH = 'swagger';
  const NODE_ENV = configService.get('NODE_ENV');
  const IS_PRODUCTION = NODE_ENV === ENODE_ENV.production;

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

  app.useGlobalPipes(new ValidationPipe()); // 全局接口参数验证+参数转换
  app.use(startLoggerMiddleware); // 全局http访问初始日志
  app.useGlobalFilters(new BizFailedExceptionFilter(bizFailedDesc)); // 全局捕获业务失败

  const port = configService.get('port');
  await app.listen(port);
  Logger.log(`App listening on ${port}, env: ${NODE_ENV}`, 'NestApplication');
  if (!IS_PRODUCTION)Logger.log(`Swagger doc setup http://127.0.0.1:${port}/${SWAGGER_PATH}`, 'NestApplication');
}
bootstrap();
