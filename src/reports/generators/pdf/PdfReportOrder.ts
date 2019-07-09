/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { PdfReport } from './PdfReport';
import { ConfigService } from '../../../config/config.service';
import { PdfDocumentDefinitionOrder } from './documentDefinition/PdfDocumentDefinitionOrder';

export class PdfReportOrder extends PdfReport {
  constructor(config: ConfigService) {
    super(config);
  }

  async generate(data: any): Promise<Buffer> {
    try {
      const documentDefinitionOrder: PdfDocumentDefinitionOrder = new PdfDocumentDefinitionOrder(this.config);
      const documentDefinition: any = documentDefinitionOrder.getDocumentDefinition(data);
      return await this.createPdfBuffer(documentDefinition);
    } catch (e) {
      return Promise.resolve(new Buffer(e));
    }
  }
}
