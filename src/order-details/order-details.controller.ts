import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetailsDto } from './order-details.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orderdetails')
export class OrderDetailsController {
  constructor(
    private readonly service: OrderDetailsService,
  ) {}

  @Get()
  @UseGuards(new JwtAuthGuard())
  find(@Query() query): Promise<any> {
    return this.service.find(query);
  }

  @Get('order/:idOrder')
  @UseGuards(new JwtAuthGuard())
  order(@Query() query, @Param() params: any): Promise<any> {
    return this.service.find(query, params);
  }

  @Put()
  @UseGuards(new JwtAuthGuard())
  update(@Body() orderDetails: OrderDetailsDto): Promise<any> {
    return this.service.save(orderDetails);
  }

  @Post()
  @UseGuards(new JwtAuthGuard())
  insert(@Body() orderDetails: OrderDetailsDto): Promise<any> {
    return this.service.save(orderDetails);
  }

  @Delete()
  @UseGuards(new JwtAuthGuard())
  remove(@Body() orderDetails: OrderDetailsDto): Promise<any> {
    return this.service.remove(orderDetails);
  }
}
