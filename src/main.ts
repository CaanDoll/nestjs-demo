import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from 'king/util/validation-pipe';
import { startLoggerMiddleware } from 'king/middleware/start-logger.middleware';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'

// TODO log4js elk
// TODO passport session redis
// TODO axios
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
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  app.use(cookieParser());
  app.use(startLoggerMiddleware);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('port'));
  Logger.log(`app listening on ${configService.get('port')}, env: ${configService.get('env')}`);
}
bootstrap();
