/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { PdfReport } from './PdfReport';
import { ConfigService } from '../../../config/config.service';
import { PdfDocumentDefinitionResult } from './PdfDocumentDefinitionResult';

export class PdfReportResult  extends PdfReport {
  constructor(config: ConfigService) {
    super(config);
  }

  async generate(data: any): Promise<Buffer> {
    try {
      const documentDefinitionResult: PdfDocumentDefinitionResult = new PdfDocumentDefinitionResult(this.config);
      const documentDefinition: any = documentDefinitionResult.getDocumentDefinition(data);
      return await this.createPdfBuffer(documentDefinition);
    } catch (e) {
      return Promise.resolve(new Buffer(e));
    }
  }

}
