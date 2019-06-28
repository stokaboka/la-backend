/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ConfigService } from '../../config/config.service';
import { ExcelResultReport } from './excel/ExcelResultReport';
import { PdfResultReport } from './pdf/PdfResultReport';

export class ReportFactory {
  static create(format: string, config: ConfigService) {
    switch (format.toUpperCase()) {
      case 'XLSX':
        return new ExcelResultReport(config);
        break;
      case 'PDF':
        return new PdfResultReport(config);
      default:
        throw {
          message: `Format not supported: ${format}`,
          name: 'Format_not_supported'.toUpperCase(),
        };
    }
  }
}
