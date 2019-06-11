/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { Header } from '../decorators/header.decorator';
import { ResultsService } from './results.service';
import { Results } from './results.entity';
import { ResultDto } from './dto/result.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('user/:idUser')
  @UseGuards(new JwtAuthGuard())
  async findUser(@Param() params): Promise<Results[]> {
    return this.resultsService.find(params);
  }

  @Get('user/:idUser/attempt/:attempt')
  @UseGuards(new JwtAuthGuard())
  async findUserAttempts(@Param() params): Promise<Results[]> {
    return this.resultsService.find(params);
  }

  @Get('count/user/:idUser/attempt/:attempt')
  @UseGuards(new JwtAuthGuard())
  async countByParams(@Param() params): Promise<number> {
    return this.resultsService.count(params);
  }

  @Post('save')
  @UseGuards(new JwtAuthGuard())
  async save(@Body() resultDto: ResultDto): Promise<any> {
    return this.resultsService.save(resultDto);
  }
}
