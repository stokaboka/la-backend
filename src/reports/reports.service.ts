/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsDto } from './dto/reports.dto';
import { Reports } from './reports.entity';
import { ResultReport } from './generators/ResultReport';
import { ExcelResultReport } from './generators/ExcelResultReport';
import { Readable } from 'stream';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Reports)
    private readonly repository: Repository<Reports>,
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

  async reportFile(params: any, format: string): Promise<Buffer> {
    const { user: idUser, attempt, test } = params;
    let resultReport: ResultReport;
    try {
      const report = await this.repository.findOne({
        where: { idUser, attempt, test },
      });

      switch (format.toUpperCase()) {
        case 'XLSX':
          resultReport = new ExcelResultReport();
          break;
      }

      if (resultReport) {
        const result = await resultReport.generate(report.data);
        // tslint:disable-next-line:no-console
        console.log('result', result);
        return result;
      }
      return new Buffer('unsupported format');
    } catch (error) {
      return new Buffer(error.message);
    }
  }

  static getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }

}
