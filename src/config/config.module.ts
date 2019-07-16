/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

// tslint:disable-next-line:no-console
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
