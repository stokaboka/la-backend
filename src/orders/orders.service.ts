import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Orders} from './orders.entity';
import { OrderDto } from './order.dto';
import { QueryParams } from '../utils/query.params';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly repository: Repository<Orders>,
  ) {}

  async findOne(where: any): Promise<Orders> {
    return await this.repository.findOne({ where });
  }

  async find(params: any): Promise<any> {

  const fields: string = 'dt, currentLevelCEF, currentLevelSVS, targetLevelCEF, targetLevelSVS, student, manager, trainer';
  const queryParams = QueryParams.prepare(params, fields.split(', '));

  const [result, total] = await this.repository.findAndCount(queryParams);

  return {
      rows: result,
      rowsNumber: total,
    };
  }

  async save(course: OrderDto): Promise<any> {
    try {
      return await this.repository.save(course);
    } catch (error) {
      return { error, course };
    }
  }

  async remove(order: OrderDto): Promise<any> {
    const { id } = order;
    try {
      return await this.repository.delete({id});
    } catch (error) {
      return { error, order };
    }
  }
}
