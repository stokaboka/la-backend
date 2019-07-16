// https://medium.com/@bo.vandersteene/use-nest-as-your-server-side-application-with-an-angular-frontend-540b0365bfa3
/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';

import { ConfigService } from './config/config.service';

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

@Injectable()
export class FrontendMiddleware implements NestMiddleware {

  private readonly ROUTE_PREFIX: string = '';
  private readonly PUBLIC_PATH: string = '';

  constructor(private readonly configService: ConfigService) {
    this.ROUTE_PREFIX = `api/v${configService.apiVersion}`;
    this.PUBLIC_PATH = configService.publicPath;

    // tslint:disable-next-line:no-console
    console.log('FrontendMiddleware', this.ROUTE_PREFIX, this.PUBLIC_PATH);
  }

  resolvePath(file: string) {
    return path.resolve(`${this.PUBLIC_PATH}`, `${file}`);
  }

  use(req: Request, res: Response, next: () => void) {
    const { url, baseUrl } = req;
    if (baseUrl.indexOf(this.ROUTE_PREFIX) === 1) {
      // it starts with /api --> continue with execution
      next();
    } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
      // it has a file extension --> resolve the file
      res.sendFile(this.resolvePath(url));
    } else {
      // in all other cases, redirect to the index.html!
      res.sendFile(this.resolvePath('index.html'));
    }
  }
}

// @Middleware()
// export class FrontendMiddleware implements NestMiddleware {
//   resolve(...args: any[]): ExpressMiddleware {
//     return (req, res, next) => {
//       const { url } = req;
//       if (url.indexOf(ROUTE_PREFIX) === 1) {
//         // it starts with /api --> continue with execution
//         next();
//       } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
//         // it has a file extension --> resolve the file
//         res.sendFile(resolvePath(url));
//       } else {
//         // in all other cases, redirect to the index.html!
//         res.sendFile(resolvePath('index.html'));
//       }
//     };
//   }
// }
