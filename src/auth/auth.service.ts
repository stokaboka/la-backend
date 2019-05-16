/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: User): Promise<any> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials

    const data = await this.usersService.signIn(user);
    if (data && data.length > 0) {
        const signInUser = data[0];
        return await this.createToken(signInUser);
    }
    return null;
  }

  async signOut(user: User): Promise<any> {
    await this.tokensService.clearTokenByUserId(user.id);
    return null;
  }

  async register(user: User): Promise<any> {
    const data = await this.usersService.register(user);
    if (data) {
      if (data.error) {
        return data;
      } else {
        return await this.createToken(data);
      }
    }
    return null;
  }

  async createToken(user: any) {
    const {id} = user;
    const playload: JwtPayload = { id };
    const token = this.jwtService.sign(playload);
    return {
      expiresIn: 3600,
      token,
      user,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // return await this.usersService.findOneByEmail(payload.email);
    // put some validation logic here
    // for example query user by id/email/username

    // tslint:disable-next-line:no-console
    console.log('validateUser', payload)
    return {};
  }
}
