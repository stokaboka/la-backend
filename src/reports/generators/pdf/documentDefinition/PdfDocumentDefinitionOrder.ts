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
    return data;
  }

  protected generateDocumentDefinition(contentData: any): any {

    // tslint:disable-next-line:no-console
    console.log(contentData);

    const { info, defaultStyle, pageMargins } = this.pdf;
    const { pageSize, pageOrientation } = this;
    const content = this.prepareContent(contentData);
    const styles = this.prepareStyles();
    return {
      info,
      pageSize,
      pageOrientation,
      pageMargins,
      content,
      styles,
      defaultStyle,
    };
  }

  protected prepareContent(content: any): any {
    return [
      {
        style: 'title',
        text: content.title,
      },
    ];
  }

  protected prepareStyles(): any {
    return {};
  }

}
