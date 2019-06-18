/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Controller, Get, Param } from '@nestjs/common';
import { Questions } from './questions.entity';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {

  constructor(private readonly questionsService: QuestionsService) {}

  @Get('/test/:test/part/:part/phase/:phase/category/:category')
  async findByTPPC(@Param() params): Promise<Questions[]> {
    return this.questionsService.findByParams(params);
  }

  @Get('/test/:test/part/:part/phase/:phase')
  async findByTPP(@Param() params): Promise<Questions[]> {
    return this.questionsService.findByParams(params);
  }

  @Get('count/test/:test/part/:part/phase/:phase')
  async countByParams(@Param() params): Promise<number> {
    return this.questionsService.countByParams(params);
  }
}
