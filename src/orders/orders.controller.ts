import { Controller } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './orders.entity';
import { OrderDto } from './order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @InjectRepository(Orders)
    private readonly repository: Repository<Orders>,
  ) {}

  async findOne(where: any): Promise<Orders> {
    return await this.repository.findOne({ where });
  }

  async find(where: any): Promise<Orders[]> {
    return await this.repository.find({ where });
  }

  async save(course: OrderDto): Promise<any> {
    try {
      return await this.repository.save(course);
    } catch (error) {
      return { error, course };
    }
  }
}
