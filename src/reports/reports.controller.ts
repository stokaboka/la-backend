import { Controller, Get, Post, Param, Body, Header, UseGuards } from '@nestjs/common';
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
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  reportFile(@Param() params: any): Promise<any> {
    return this.reportsService.reportFile(params, 'xlsx');
  }
}
