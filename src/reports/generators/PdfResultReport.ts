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

  async generate(data: any): Promise<Buffer> {
    return ResultReport.toBuffer('');
  }
}
