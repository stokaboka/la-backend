/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ConfigService } from '../../config/config.service';

export class Report {

  static headers: any = {
    EXCEL: {
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

  config: ConfigService;

  constructor(config: ConfigService) {
    this.config = config;
  }

  generate(data: any): Promise<Buffer> {
    return Promise.reject(new Buffer('Report.generate: implement me'));
  }

  static toBuffer(dataObject: any): Promise<Buffer> {
    return Promise.resolve(new Buffer(dataObject));
  }

}
