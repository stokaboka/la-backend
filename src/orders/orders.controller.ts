import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { OrderDto } from './order.dto';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { ReportsService } from '../reports/reports.service';
import { OrderReportDto } from './order.report.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly service: OrdersService,
  ) {}

  @Get()
  @UseGuards(new JwtAuthGuard())
  find(@Query() params): Promise<any> {
    return this.service.find(params);
  }

  @Put()
  @UseGuards(new JwtAuthGuard())
  update(@Body() order: OrderDto): Promise<any> {
    return this.service.save(order);
  }

  @Post()
  @UseGuards(new JwtAuthGuard())
  insert(@Body() order: OrderDto): Promise<any> {
    return this.service.save(order);
  }

  @Delete()
  @UseGuards(new JwtAuthGuard())
  remove(@Body() order: OrderDto): Promise<any> {
    return this.service.remove(order);
  }

  @Get('reports/id/:id/format/:format')
  @UseGuards(new JwtAuthGuard())
  async reports(
    @Param() params: OrderReportDto,
    @Res() res: Response,
  ) {
    const buffer = await this.service.reportFile(params);
    const stream = ReportsService.getReadableStream(buffer);
    const headers = ReportsService.getHeadersByFormat(params, buffer.length);

    res.set(headers);

    stream.pipe(res);
  }
}
