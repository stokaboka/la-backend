/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ConfigService } from '../../config/config.service';

export class ResultReport {

  static headers: any = {
    XLSX: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Accept': 'application/vnd.ms-excel',
      'Content-Disposition': 'attachment',
    },
    PDF: {
      'Content-Type': 'application/pdf',
      'Accept': 'application/pdf',
      'Content-Disposition': 'attachment',
    },
  };

  tmplPath: string;
  tmplFile: string;

  constructor(format: string, config: ConfigService) {
    this.tmplPath = config.templatePath;
  }

  getTemplatePathFile(): string {
    return `${this.tmplPath}/${this.tmplFile}`;
  }

  generate(data: any): Promise<Buffer> {
    return Promise.reject(new Buffer('ResultReport.generate: implement me'));
  }

  static toBuffer(dataObject: any): Promise<Buffer> {
    return Promise.resolve(new Buffer(dataObject));
  }

}
