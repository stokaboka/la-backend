/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
// import { join } from 'path';

import { ConfigService } from './config/config.service';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const apiVersionNumber = app.get('ConfigService').apiVersion;
  app.setGlobalPrefix(`api/v${apiVersionNumber}`);

  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );
  // app.useStaticAssets({
  //   root: join(__dirname, '..', 'public'),
  //   prefix: '/public/',
  // });

  const publicPath = app.get('ConfigService').publicPath;
  // tslint:disable-next-line:no-console
  console.log('publicPath', publicPath);
  app.useStaticAssets(publicPath);

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Content-Type,Authorization,Accept',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  });

  const port = app.get('ConfigService').port || 3000;
  const host = app.get('ConfigService').host || '0.0.0.0';

  try {
    await app.listen(port, host);
    // tslint:disable-next-line:no-console
    console.log('Server started:', host, port);
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Server failed:', e.message);
  }
}
bootstrap();
