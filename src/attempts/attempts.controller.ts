/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ResultsService } from '../results/results.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('attempts')
export class AttemptsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('user/:idUser')
  @UseGuards(new JwtAuthGuard())
  find(@Param() params): Promise<any[]> {
    return this.resultsService.attempts(params);
  }
}
