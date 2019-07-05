import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './order-details.entity';
import { OrderDetailsDto } from './order-details.dto';
import { QueryParams } from '../utils/query.params';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetails)
    private repository: Repository<OrderDetails>,
  ) {}

  async findOne(where: any): Promise<OrderDetails> {
    return await this.repository.findOne({ where });
  }

  async find(params: any): Promise<any> {

    const fields: string = 'num, course, target, hours, price, cost, timing, rem';
    const queryParams = QueryParams.prepare(params, fields.split(', '));

    const [result, total] = await this.repository.findAndCount(queryParams);

    return {
      rows: result,
      rowsNumber: total,
    };
  }

  async save(orderDetails: OrderDetailsDto): Promise<any> {
    try {
      return await this.repository.save(orderDetails);
    } catch (error) {
      return { error, orderDetails };
    }
  }

  async remove(orderDetails: OrderDetailsDto): Promise<any> {
    const { id } = orderDetails;
    try {
      return await this.repository.delete({id});
    } catch (error) {
      return { error, orderDetails };
    }
  }

}
