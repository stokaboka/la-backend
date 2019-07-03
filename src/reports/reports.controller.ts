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

  @Get('user/:user/test/:test/attempt/:attempt')
  @UseGuards(new JwtAuthGuard())
  async findOne(@Param() params: any): Promise<any> {
    return this.reportsService.findOne(params);
  }

  @Get('user/:user/test/:test/attempt/:attempt/format/:format')
  @UseGuards(new JwtAuthGuard())
  async reportFile(
    @Param() params: any,
    @Res() res: Response,
  ) {
    const buffer = await this.reportsService.reportFile('result', params);
    const stream = ReportsService.getReadableStream(buffer);
    const headers = ReportsService.getHeadersByFormat(params, buffer.length);

    res.set(headers);

    stream.pipe(res);
  }
}
