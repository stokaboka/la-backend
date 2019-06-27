/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ResultReport } from './ResultReport';
import { ConfigService } from '../../config/config.service';

export class PdfResultReport extends ResultReport {
  constructor(config: ConfigService) {
    super('pdf', config);
    this.tmplFile = config.templateResultExcelFile;
  }

  toPromiseBuffer(dataObject: any): Promise<Buffer> {
    return Promise.resolve(new Buffer(''));
  }

  async createFromTemplate(data: any): Promise<any> {
    return Promise.resolve({});
  }

  async generate(data: any): Promise<Buffer> {
    try {
      const wb = await this.createFromTemplate(data);
      return await this.toPromiseBuffer(wb);
    } catch (e) {
      return Promise.resolve(new Buffer(e));
    }
  }

}
