/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ConfigService } from '../../../../config/config.service';
import { PdfDocumentDefinition } from './PdfDocumentDefinition';

export class PdfDocumentDefinitionOrder extends PdfDocumentDefinition {

  constructor(config: ConfigService) {
    super(config);
  }

  protected getContent(data: any): any {
    return null;
  }

  protected generateDocumentDefinition(content: any): any {
    return null;
  }

}
