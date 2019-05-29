/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { Header } from '../decorators/header.decorator';
import { AnswersService } from './answers.service';
import { Answers } from './answers.entity';
import { AnswerDto } from './dto/answer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get('list/user/:idUser/attempt/:attempt')
  async findByParams(@Param() params): Promise<Answers[]> {
    return this.answersService.findByParams(params);
  }

  @Get('count/user/:idUser/attempt/:attempt')
  async countByParams(@Param() params): Promise<number> {
    return this.answersService.countByParams(params);
  }

  @Post('save')
  @UseGuards(new JwtAuthGuard())
  async save(@Body() answerDto: AnswerDto): Promise<any> {
    return this.answersService.save(answerDto);
  }
}
