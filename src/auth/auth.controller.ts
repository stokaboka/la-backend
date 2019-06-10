/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Controller, Get, Post, Body, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Header } from '../decorators/header.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { Users } from '../users/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() userDto: UserDto, @Header('authorization') token: string): Promise<Users> {
    const user = await this.authService.signIn(userDto, token);
    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    if (user.error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  @Post('signout')
  async signOut(@Body() userDto: UserDto): Promise<any> {
    return await this.authService.signOut(userDto);
  }

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<any> {
    const data = await this.authService.register(userDto);
    if (!data) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    return data;
  }

  @Get('users')
  // @UseGuards(AuthGuard())
  @UseGuards(new JwtAuthGuard())
  findAll() {
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}
