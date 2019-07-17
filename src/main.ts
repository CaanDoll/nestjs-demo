import { BizFailedExceptionFilter } from '@common/http/biz-failed';
import { startLoggerMiddleware } from '@common/middleware/logger';
import { ValidationPipe } from '@common/util/validation-pipe';
import { Logger } from '@nestjs/common';
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
  );

  const configService = app
    .get('ConfigService');

  if (configService.get('env') !== 'production') {
    const options = new DocumentBuilder()
      .setTitle(configService.get('npm_package_name'))
      .setDescription(configService.get('npm_package_description'))
      .setVersion(configService.get('npm_package_version'))
      .addBearerAuth('token', 'header')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  app.use(startLoggerMiddleware);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BizFailedExceptionFilter());

  const port = configService.get('port');
  await app.listen(port);
  Logger.log(`App listening on ${port}, env: ${configService.get('env')}`, 'NestApplication');
}
bootstrap();
