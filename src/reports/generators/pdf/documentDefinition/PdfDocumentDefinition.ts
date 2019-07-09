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

  logo: string = 'svs_logo.png';

  pageSize: string = 'A4';
  pageOrientation: string = 'landscape';

  styles: any = {
    header: 'tableHeader',
    cell: {
      N: 'tableCellNum',
      S: 'tableCellText',
    },
    summary: {
      N: 'tableCellNumBold',
      S: 'tableCellTextBold',
    },
  };

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
    return {
      bigTitle: {
        fontSize: 20,
        bold: true,
        alignment: 'center',
      },
      title: {
        fontSize: 16,
        bold: true,
        alignment: 'center',
      },
      subtitle: {
        fontSize: 14,
        alignment: 'center',
      },
      textCenter: {
        fontSize: 12,
        alignment: 'center',
      },
      boldText: {
        bold: true,
      },
      tableHeader: {
        fontSize: 10,
        bold: true,
        alignment: 'center',
      },
      tableCellNum: {
        fontSize: 10,
        alignment: 'right',
      },
      tableCellText: {
        fontSize: 10,
        alignment: 'left',
      },
      tableCellNumBold: {
        fontSize: 10,
        bold: true,
        alignment: 'right',
      },
      tableCellTextBold: {
        fontSize: 10,
        bold: true,
        alignment: 'left',
      },
    };
  }

  protected generateDataTable(model: any, data: any): any {
    const out: any[] = [];

    const headerTable: any[] = this.generateHeaderRow(model);
    out.push(headerTable);

    for (const row of data) {
      const rowTable = this.generateDataRow(model, row);
      out.push(rowTable);
    }

    const summaryRow = this.generateSummaryRow(model, data);
    out.push(summaryRow);

    return out;
  }

  protected generateHeaderRow(model: any): any[] {
    const out = [];
    const style = this.styles.header;
    for (const column of model) {
      const { label: text } = column;
      out.push({ text, style });
    }
    return out;
  }

  protected generateDataRow(model: any, row: any): any[] {
    const out = [];
    for (const column of model) {
      const { field, type } = column;
      const style = this.styles.cell[type];
      const text = row[field] ? row[field] : '';
      out.push({
        text: `${text}`,
        style,
      });
    }
    return out;
  }

  protected generateSummaryRow(model: any, data: any): any[] {
    const out = [];
    for (const column of model) {
      const { field, calculate, type } = column;
      const style = this.styles.summary[type];
      if (calculate) {
        let value = 0;

        for (const row of data) {
          value += row[field] ? row[field] : 0;
        }

        out.push({
          text: `${value}`,
          style,
        });
      } else {
        out.push('');
      }
    }
    return out;
  }
}
