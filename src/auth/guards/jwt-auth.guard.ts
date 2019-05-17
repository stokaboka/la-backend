/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // tslint:disable-next-line:no-console
    console.log('err', err);
    // tslint:disable-next-line:no-console
    console.log('user', user);
    // tslint:disable-next-line:no-console
    console.log('info', info);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
