import { Controller } from '@nestjs/common';
import { OrderDetailsService } from './order-details.service';
import { OrderDetails } from './order-details.entity';
import { OrderDetailsDto } from './order-details.dto';

@Controller('order-details')
export class OrderDetailsController {
  constructor(
    private readonly service: OrderDetailsService,
  ) {}

  async findOne(where: any): Promise<OrderDetails> {
    return await this.service.findOne({ where });
  }

  async find(where: any): Promise<OrderDetails[]> {
    return await this.service.find({ where });
  }

  async save(details: OrderDetailsDto): Promise<any> {
    try {
      return await this.service.save(details);
    } catch (error) {
      return { error, details };
    }
  }
}
