/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {

  port: number = 4444;
  host: string = '0.0.0.0';

  constructor(config: ConfigService) {
    this.port = config.port;
    this.host = config.host;
  }
  getHello(): string {
    return 'Hello World! I`m am Svoboda Lingvo Language Assessment©';
  }
}
