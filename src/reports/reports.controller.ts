/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Controller, Get, Post, Param, Body, Header, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReportsDto } from './dto/reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('save')
  @UseGuards(new JwtAuthGuard())
  saveResult(@Body() data: ReportsDto): Promise<any> {
    return this.reportsService.save(data);
  }

  @Get('xlsx/user/:user/test/:test/attempt/:attempt')
  @UseGuards(new JwtAuthGuard())
  async reportFile(
    @Param() params: any,
    @Res() res: Response,
  ) {
    const buffer = await this.reportsService.reportFile(params, 'xlsx');
    const stream = ReportsService.getReadableStream(buffer);

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Length': buffer.length,
      'Accept': 'application/vnd.ms-excel',
      'Content-Disposition': 'attachment',
    });

    stream.pipe(res);
  }
}
