/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Body, Controller, Get, Param, Query, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserFixDto } from './dto/user.fix.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  @UseGuards(new JwtAuthGuard())
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get('find')
  @UseGuards(new JwtAuthGuard())
  find(@Query() params): Promise<any> {
    return this.usersService.find(params);
  }

  @Get('count')
  @UseGuards(new JwtAuthGuard())
  countAll(): Promise<number> {
    return this.usersService.countAll();
  }

  @Post('fix')
  @UseGuards(new JwtAuthGuard())
  fix(@Body() userfixDto: UserFixDto): Promise<any> {
    return this.usersService.fix(userfixDto);
  }
}
