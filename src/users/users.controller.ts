/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Body, Controller, Get, Post, Put, Param, Query, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserFixDto } from './dto/user.fix.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(new JwtAuthGuard())
  find(@Query() params): Promise<any> {
    return this.usersService.find(params);
  }

  @Put()
  @UseGuards(new JwtAuthGuard())
  update(@Body() userDto: UserDto): Promise<any> {
    try {
      return this.usersService.update(userDto);
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.NO_CONTENT);
    }
  }

  @Put('fix')
  @UseGuards(new JwtAuthGuard())
  fix(@Body() userfixDto: UserFixDto): Promise<any> {
    return this.usersService.fix(userfixDto);
  }

  @Put('unfix')
  @UseGuards(new JwtAuthGuard())
  unfix(@Body() userfixDto: UserFixDto): Promise<any> {
    return this.usersService.unfix(userfixDto);
  }

}
