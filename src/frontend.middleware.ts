import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';

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

const ROUTE_PREFIX = 'v1';

const resolvePath = (file: string) => path.resolve(`../dist/${file}`);

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { url } = req;
    if (url.indexOf(ROUTE_PREFIX) === 1) {
      // it starts with /api --> continue with execution
      next();
    } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
      // it has a file extension --> resolve the file
      res.sendFile(resolvePath(url));
    } else {
      // in all other cases, redirect to the index.html!
      res.sendFile(resolvePath('index.html'));
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
