/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsDto } from './dto/reports.dto';
import { Reports } from './reports.entity';
import { ResultReport } from './generators/ResultReport';
import { Readable } from 'stream';
import { ConfigService } from '../config/config.service';
import { ReportFactory } from './generators/ReportFactory';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reports)
    private readonly repository: Repository<Reports>,
    private readonly config: ConfigService,
  ) {}

  async save(data: ReportsDto): Promise<any> {
    const { idUser, attempt, test } = data;
    try {
      await this.repository.delete({ idUser, attempt, test });
      const out = await this.repository.insert(data);
      return out;
    } catch (error) {
      return { error, data };
    }
  }

  async reportFile(params: any): Promise<Buffer> {
    const { user: idUser, attempt, test, format } = params;
    try {
      const resultReport: ResultReport = ReportFactory.create(
        format,
        this.config,
      );

      const report = await this.repository.findOne({
        where: { idUser, attempt, test },
      });

      return await resultReport.generate(report.data);
    } catch (e) {
      return ResultReport.toBuffer(e.message);
    }
  }

  static getHeadersByFormat(params: any, length: number): any {
    const { format } = params;
    const upperCaseFormat = format.toUpperCase();
    if (ResultReport.headers[upperCaseFormat] !== undefined) {
      return {
        'Content-Length': length,
        ...ResultReport.headers[upperCaseFormat],
      };
    }
    return {};
  }

  static getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
