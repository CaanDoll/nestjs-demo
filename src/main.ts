import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from 'king/util/validation-pipe';
import { startLogger } from 'king/middleware/entry';
import { sessionMiddlewares } from 'king/auth/session.middleware';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  const configService = app
    .get('ConfigService');

  if(configService.get('env') !== 'production'){
    const options = new DocumentBuilder()
      .setTitle(configService.get('npm_package_name'))
      .setDescription(configService.get('npm_package_description'))
      .setVersion(configService.get('npm_package_version'))
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  app.use(startLogger);

  app.use(...sessionMiddlewares(configService.get('redis')));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('port'));
  Logger.log(`app listening on ${configService.get('port')}, env: ${configService.get('env')}`);
}
bootstrap();
