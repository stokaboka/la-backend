/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ConfigService } from '../../../../config/config.service';
import { Base64 } from '../../../../utils/base64';
import { DateString } from '../../../../utils/date';

export class PdfDocumentDefinition {

  config: ConfigService;
  format: any = {
    date: 'DD.MM.YYYY',
  };

  constructor(config: ConfigService) {
    this.config = config;
  }

  imageToDataUri(file: string): string {
    return Base64.imageToDataUri(file);
  }

  dateToString(date: any): string {
    return DateString.dateToString(date, this.format.date);
  }

  getDocumentDefinition(data: any): any {
    const content = this.getContent(data);
    return this.generateDocumentDefinition(content);
  }

  protected getContent(data: any): any {
    return null;
  }

  protected generateDocumentDefinition(content: any): any {
    return null;
  }
}
