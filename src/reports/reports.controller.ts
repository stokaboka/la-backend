import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('result/xlsx')
  // @UseGuards(new JwtAuthGuard())
  find(@Body() data: any): Promise<any> {
    return this.reportsService.xlsx(data);
  }

  @Post('result/xlsx')
  // @UseGuards(new JwtAuthGuard())
  xlsx(@Body() data: any): Promise<any> {
    return this.reportsService.xlsx(data);
  }
}
