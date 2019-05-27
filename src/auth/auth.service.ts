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

  async signIn(user: User, ptoken: string): Promise<any> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials

    let data = null;

    if (ptoken) {
      const token = ptoken.startsWith('Bearer') ? ptoken.substr(7) : ptoken;
      // tslint:disable-next-line:no-console
      // console.log('token', token);
      try {
        const verifyResult = await this.jwtService.verifyAsync(token);
        // tslint:disable-next-line:no-console
        // console.log('verifyResult', verifyResult);
        data = await this.usersService.findOneById(verifyResult.id);
        if (data && data.length > 0) {
          return this.getAuthData(data[0], token);
        }
      } catch (error) {
        return {
          error,
        };
      }
    }

    data = await this.usersService.signIn(user);
    if (data && data.length > 0) {
      return this.getAuthData(data[0]);
    }

    return null;
  }

  async signOut(user: User): Promise<any> {
    await this.tokensService.clearTokenByUser(user);
    return {};
  }

  async register(user: User): Promise<any> {
    const data = await this.usersService.register(user);
    if (data) {
      if (data.error) {
        return data;
      } else {
        return await this.getAuthData(data);
      }
    }
    return null;
  }

  async createToken(user: any) {
    const { id } = user;
    const playload: JwtPayload = { id };
    const token = this.jwtService.sign(playload);
    return token;
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // return await this.usersService.findOneByEmail(payload.email);
    // put some validation logic here
    // for example query user by id/email/username

    // tslint:disable-next-line:no-console
    console.log('validateUser', payload);
    return {};
  }

  async getAuthData(user, token = null): Promise<any> {
    return {
      token: token ? token : await this.createToken(user),
      user,
    };
  }
}
