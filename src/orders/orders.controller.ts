import { Controller } from '@nestjs/common';
import { Orders } from './orders.entity';
import { OrderDto } from './order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly service: OrdersService,
  ) {}

  async findOne(where: any): Promise<Orders> {
    return await this.service.findOne({ where });
  }

  async find(where: any): Promise<Orders[]> {
    return await this.service.find({ where });
  }

  async save(course: OrderDto): Promise<any> {
    try {
      return await this.service.save(course);
    } catch (error) {
      return { error, course };
    }
  }
}
