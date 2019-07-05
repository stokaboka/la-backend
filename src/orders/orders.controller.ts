import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OrderDto } from './order.dto';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
}
