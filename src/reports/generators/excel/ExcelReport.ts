/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Report } from '../Report';
import { ConfigService } from '../../../config/config.service';

export class ExcelReport extends Report {
  tmplFile: string;
  constructor(config: ConfigService) {
    super(config);
  }

  getTemplatePathFile(): string {
    return `${this.config.filesTemplatesPath}/${this.tmplFile}`;
  }

}
