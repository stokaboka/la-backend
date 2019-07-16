/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Report } from '../Report';
import { ConfigService } from '../../../config/config.service';

export class ExcelReport extends Report {
  tmplPath: string;
  tmplFile: string;
  constructor(config: ConfigService) {
    super(config);
    this.tmplPath = config.templatePath;
  }

  getTemplatePathFile(): string {
    // return `${this.tmplPath}/${this.tmplFile}`;
    return `${this.config.filesTemplatesPath}/${this.tmplFile}`;
  }

}
