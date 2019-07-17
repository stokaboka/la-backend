/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ConfigService } from '../../../../config/config.service';
import { PdfDocumentDefinition } from './PdfDocumentDefinition';

export class PdfDocumentDefinitionOrder extends PdfDocumentDefinition {

  orderDetailModel: any[] = [
    { label: '##', field: 'num', type: 'N', width: 50},
    { label: 'Курс', field: 'course', type: 'S',  width: 'auto'},
    { label: 'Цель', field: 'target', type: 'S',  width: '*'},
    { label: 'Часов', field: 'hours', type: 'N', width: 30, calculate: 'sum'},
    { label: 'Стоимость', field: 'price', type: 'N', width: 60, calculate: 'sum'},
    // { label: 'Стоимость', field: 'cost', type: 'N', width: 80, calculate: 'sum'},
    { label: 'Время проведения', field: 'timing', type: 'S',  width: '*'},
    { label: 'Комментарий', field: 'rem', type: 'S',  width: '*'},
  ];

  constructor(config: ConfigService) {
    super(config);
  }

  protected getContent(data: any): any {
    return {
      ...data,
      title: 'План обучения',
      logoImage: this.imageToDataUri(`${this.config.imagesPath}/${this.logo}`),
      logoImageSize: [132, 99],
      // logoImageSize: [88, 66],
      date: this.dateToString(data.order.dt.toISOString()),
    };
  }

  protected generateDocumentDefinition(contentData: any): any {

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
    const { order, details, title, date, logoImage, logoImageSize } = content;
    return [
      {
        table: {
          widths: [100, '*', 100],
          body: [
            [
              '',
              { style: 'title', text: `${title}` },
              { rowSpan: 3, image: logoImage, fit: logoImageSize },
            ],
            [
              '',
              {
                style: 'bigTitle',
                text: `${order.student}`,
              },
            ],
            [
              '',
              {
                style: 'subtitle',
                text: `от ${date}`,
              },
            ],
          ],
        },
        layout: 'noBorders',
      },
      {
        table: {
          widths: [100, '*'],
          body: [
            ['Менеджер:', { text: `${order.manager}`, style: 'boldText' }],
            ['Тренер:', { text: `${order.trainer}`, style: 'boldText' }],
          ],
        },
        layout: 'noBorders',
      },
      {
        margin: [0, 10],
        table: {
          widths: ['auto', 'auto', 'auto'],
          body: [
            ['', 'Уровень CEF', 'Уровень "Cвобода слова"'],
            ['Тестирование', `${order.currentLevelCEF}`, `${order.currentLevelSVS}`],
            ['Цель', `${order.targetLevelCEF}`, `${order.targetLevelSVS}`],
          ],
        },
      },
      {
        table: {
          widths: this.orderDetailModel.map(e => e.width),
          body: this.generateDataTable(this.orderDetailModel, details),
        },
      },
    ];
  }

}
