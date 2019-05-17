/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Controller, Get, Post, Body, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { Auth } from './auth.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Auth('authorization') token: string, @Body() userDto: UserDto): Promise<any> {
    const data = await this.authService.signIn(userDto, token);
    if (!data) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    if (data.error) {
      throw new HttpException('Forbidden', HttpStatus.UNAUTHORIZED);
    }
    return data;
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
