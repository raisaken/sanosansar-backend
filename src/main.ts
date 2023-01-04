import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const swaggerEnvs = ['local', 'dev', 'staging'];
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const prefix: string = process.env.API_GLOBAL_PREFIX ?? 'api';
  const version: string = process.env.API_GLOBAL_VERSION ?? 'v1';
  app.setGlobalPrefix(`${prefix}/${version}`);

  if (swaggerEnvs.includes(process.env.NODE_ENV)) {
    app.use(
      ['/api/docs', '/api/docs-json'],
      basicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        },
      }),
    );

    const options = new DocumentBuilder()
      .setTitle(process.env.API_DOCS_TITLE)
      .setDescription(process.env.API_DOCS_DESCRIPTION)
      .setVersion(process.env.API_DOCS_VERSION || '1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'JWT',
          description: 'Enter JWT access token',
          in: 'header',
        },
        'authorization',
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(
      process.env.API_DOCS_PREFIX || '/api/docs',
      app,
      document,
    );
  }
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });
  await app.listen(port);
  Logger.log(`Application started on port: ${port}`);
}
bootstrap();
