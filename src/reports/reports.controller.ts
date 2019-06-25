import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
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

  @Get('result/user/:user/test/:test/attempt/:attempt/format/:format')
  @UseGuards(new JwtAuthGuard())
  xlsx(@Param() params: any): Promise<any> {
    return this.reportsService.xlsx(params);
  }
}
