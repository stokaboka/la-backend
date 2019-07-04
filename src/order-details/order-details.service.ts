import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './order-details.entity';
import { OrderDetailsDto } from './order-details.dto';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private readonly repository: Repository<OrderDetails>,
  ) {}

  async findOne(where: any): Promise<OrderDetails> {
    return await this.repository.findOne({ where });
  }

  async find(where: any): Promise<OrderDetails[]> {
    return await this.repository.find({ where });
  }

  async save(course: OrderDetailsDto): Promise<any> {
    try {
      return await this.repository.save(course);
    } catch (error) {
      return { error, course };
    }
  }
}
