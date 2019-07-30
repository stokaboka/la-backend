import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { OrderDto } from './order.dto';
import { QueryParams } from '../utils/query.params';
import { Repository } from 'typeorm';
import { OrderReportDto } from './order.report.dto';
import { ConfigService } from '../config/config.service';
import { Report } from '../reports/generators/Report';
import { ReportFactory } from '../reports/generators/ReportFactory';
import { OrderDetailsService } from '../order-details/order-details.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private readonly repository: Repository<Orders>,
    private readonly orderDetailsService: OrderDetailsService,
    private readonly config: ConfigService,
  ) {}

  async findOne(where: any): Promise<Orders> {
    return await this.repository.findOne({ where });
  }

  async find(params: any): Promise<any> {
    const fields: string =
      'dt, currentLevelCEFR, currentLevelSVS, targetLevelCEFR, targetLevelSVS, student, manager, trainer';
    const queryParams = QueryParams.prepare(params, fields.split(', '));

    const [result, total] = await this.repository.findAndCount(queryParams);

    return {
      rows: result,
      rowsNumber: total,
    };
  }

  async save(order: OrderDto): Promise<any> {
    try {
      return await this.repository.save(order);
    } catch (error) {
      return { error, order };
    }
  }

  async remove(order: OrderDto): Promise<any> {
    const { id } = order;
    try {

      try {
        const remodeDtails = this.orderDetailsService.removeOrder(id);
      } catch (error) {
        return { error, order };
      }

      return await this.repository.delete({ id });
    } catch (error) {
      return { error, order };
    }
  }

  async reportFile(params: OrderReportDto): Promise<Buffer> {
    const { id, id: idOrder, format } = params;
    const report = 'order';
    try {
      const reportGenerator: Report = ReportFactory.create(
        format,
        report,
        this.config,
      );

      const order = await this.findOne({ id });
      const details = await this.orderDetailsService.find(
        { sortBy: 'num'},
        { idOrder },
      );

      const reportData = {
        order,
        details: details.rows,
      };

      return await reportGenerator.generate(reportData);
    } catch (e) {
      return Report.toBuffer(e.message);
    }
  }
}
