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

  pageSize: string = 'A4';
  pageOrientation: string = 'landscape';

  pdf: any = {
    info: {
      title: 'Свобода слова - Language Assessment©',
      author: 'Igor Khorev <igorhorev@gmail.com>',
      subject: '',
      keywords: 'language assessment',
    },
    pageMargins: [40, 40, 40, 40],
    defaultStyle: {
      columnGap: 20,
    },
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
    return data;
  }

  protected generateDocumentDefinition(contentData: any): any {
    return contentData;
  }

  protected prepareContent(content: any): any {
    return [];
  }

  protected prepareStyles(): any {
    return {};
  }
}
