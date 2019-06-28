/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Report } from '../Report';
import { ConfigService } from '../../../config/config.service';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class PdfReport extends Report {
  constructor(config: ConfigService) {
    super(config);
  }

  toPromiseBuffer(buffer: Buffer): Promise<Buffer> {
    return Promise.resolve(buffer);
  }

  async createFromDocumentDefinition(documentDefinition: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      pdfMake
        .createPdf(documentDefinition)
        .getBuffer((results: any, pages: any) => {
          resolve(results);
        });
    });
  }

  async createPdfBuffer(documentDefinition: any): Promise<Buffer> {
    try {
      const pdfBuffer = await this.createFromDocumentDefinition(documentDefinition);
      return this.toPromiseBuffer(pdfBuffer);
    } catch (e) {
      return this.toPromiseBuffer(new Buffer(e));
    }
  }

}
