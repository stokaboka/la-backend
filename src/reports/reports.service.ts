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

  async reportFile(params: any, format: string): Promise<Buffer> {
    const { user: idUser, attempt, test } = params;
    try {
      const resultReport: ResultReport = ReportFactory.create(
        format,
        this.config,
      );

      const report = await this.repository.findOne({
        where: { idUser, attempt, test },
      });

      return await resultReport.generate(report.data);
      // const resultBuffer: Promise<Buffer> = await resultReport.generate(report.data);
      // return resultBuffer;

      // switch (format.toUpperCase()) {
      //   case 'XLSX':
      //     resultReport = new ExcelResultReport(this.config);
      //     break;
      //   case 'PDF' :
      //     resultReport = new PdfResultReport(this.config);
      // }
      // if (resultReport) {
      //   resultBuffer = await resultReport.generate(report.data);
      //   // return resultBuffer;
      // }
    } catch (e) {
      return ResultReport.toBuffer(e.message);
    }
  }

  static getReadableStream(buffer: Buffer): Readable {
    const stream = new Readable();

    stream.push(buffer);
    stream.push(null);

    return stream;
  }
}
