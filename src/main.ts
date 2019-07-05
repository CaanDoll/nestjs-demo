import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import AppModule from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import ValidationPipe from 'king/base/validation-pipe';
import { startLogger } from 'king/middleware/entry';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  const { npm_package_name, npm_package_version, npm_package_description } = process.env;
  const options = new DocumentBuilder()
    .setTitle(npm_package_name)
    .setDescription(npm_package_description)
    .setVersion(npm_package_version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  app.use(startLogger);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

}
bootstrap();
