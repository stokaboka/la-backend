/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ConfigService } from '../../config/config.service';
import { ExcelResultReport } from './excel/ExcelReportResult';
import { PdfReport } from './pdf/PdfReport';
import { ExcelReport } from './excel/ExcelReport';
import { PdfReportResult } from './pdf/PdfReportResult';

export class ReportFactory {
  static create(format: string, report: string, config: ConfigService) {
    switch (format.toUpperCase()) {
      case 'XLSX':
        return ReportFactory.createExcelReport(report, config);
      case 'PDF':
        return ReportFactory.createPdfReport(report, config);
      default:
        throw {
          message: `Format not supported: ${format}`,
          name: 'Format_not_supported'.toUpperCase(),
        };
    }
  }

  static createExcelReport(report: string, config: ConfigService): ExcelReport {
    switch (report.toUpperCase()) {
      case 'RESULT' :
        return new ExcelResultReport(config);
      default:
        throw {
          message: `Report not supported: ${report}`,
          name: 'Report_not_supported'.toUpperCase(),
        };
    }
  }

  static createPdfReport(report: string, config: ConfigService): PdfReport {
    switch (report.toUpperCase()) {
      case 'RESULT' :
        return new PdfReportResult(config);
      default:
        throw {
          message: `Report not supported: ${report}`,
          name: 'Report_not_supported'.toUpperCase(),
        };
    }
  }
}
