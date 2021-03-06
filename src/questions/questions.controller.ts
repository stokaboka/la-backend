/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Controller, Get, Put, Post, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { Questions } from './questions.entity';
import { QuestionsService } from './questions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QuestionDto } from './dto/question.dto';
import { QueryParams } from '../utils/query.params';

@Controller('questions')
export class QuestionsController {

  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/test/:test/part/:part/phase/:phase/category/:category')
  async findByTPPC(@Param() params, @Query() query): Promise<Questions[]> {
    return this.questionsService.findByParams(params, query);
  }

  @Get('/test/:test/part/:part/phase/:phase')
  async findByTPP(@Param() params, @Query() query): Promise<Questions[]> {
    return this.questionsService.findByParams(params, query);
  }

  @Get('count/test/:test/part/:part/phase/:phase')
  async countByParams(@Param() params): Promise<number> {
    return this.questionsService.countByParams(params);
  }

  @Post()
  @UseGuards(new JwtAuthGuard())
  async saveInsert(@Body() questionDto: QuestionDto): Promise<any> {
    return this.questionsService.save(questionDto);
  }

  @Put()
  @UseGuards(new JwtAuthGuard())
  async saveUpdate(@Body() questionDto: QuestionDto): Promise<any> {
    return this.questionsService.save(questionDto);
  }

  @Delete()
  @UseGuards(new JwtAuthGuard())
  async saveDelete(@Body() questionDto: QuestionDto): Promise<any> {
    return this.questionsService.delete(questionDto);
  }
}
