import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ReportsDto } from './dto/reports.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('result')
  @UseGuards(new JwtAuthGuard())
  saveResult(@Body() data: ReportsDto): Promise<any> {
    return this.reportsService.save(data);
  }

  @Get('result/xlsx/user/:user/attempt/:attempt')
  @UseGuards(new JwtAuthGuard())
  xlsx(@Param() data: any): Promise<any> {
    return this.reportsService.xlsx(data);
  }
}
