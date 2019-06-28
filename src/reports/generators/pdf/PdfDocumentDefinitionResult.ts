/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ConfigService } from '../../../config/config.service';

export class PdfDocumentDefinitionResult {

  config: ConfigService;
  constructor(config: ConfigService) {
    this.config = config;
  }

  getDocumentDefinition(data: any): any {
    const content = this.getContent(data);
    return this.generateDocumentDefinition(content);
  }

  protected getContent(data: any): any {
    const out: any = {
      title: 'РЕЗУЛЬТАТЫ Language Assessment',
      logoImage: `${this.config.imagesPath}/svs_logo.png`,
      header: {
        student: data.student,
        manager: data.manager,
        trainer: data.trainer,
        date: data.date,
        finalResult: '',
      },
      results: {
        levelOneMarker: [],
        levelOneValue: data.results.levelOne_value,
        phoneticAndPronunciationSelectValue: data.results.phoneticAndPronunciationSelect_value,
        partTwoResultClearValue: data.results.partTwoResultClear_value,
        descriptions: data.results.descriptions,
      },
    };

    return out;
  }

  private generateDocumentDefinition(content: any): any {
    const out: any = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      pageMargins: [40, 40, 40, 40],
      content: [
        {
          style: 'title',
          text: content.title,
        },
        {
          table: {
            widths: [100, '*', 200],
            body: [
              [
                'Студент:',
                `${content.header.student}`,
                { rowSpan: 5, text: content.logoImage },
              ],
              ['Менеджер:', `${content.header.manager}`],
              ['Тренер:', `${content.header.trainer}`],
              ['Дата:', `${content.header.date}`],
              ['Итоговый уровень:', `${content.header.finalResult}`],
            ],
          },
          layout: 'noBorders',
        },
        {
          table: {
            widths: ['auto', 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
            body: [
              [
                'Общеевропейская Система Уровней Владения Иностранными Языками (CEF)',
                { text: 'A1', colSpan: 3, alignment: 'center' },
                '',
                '',
                { text: 'A2', colSpan: 2, alignment: 'center' },
                '',
                { text: 'B1', colSpan: 2, alignment: 'center' },
                '',
                { text: 'B2', colSpan: 2, alignment: 'center' },
                '',
                { text: 'C1', alignment: 'center' },
                { text: 'C2', alignment: 'center' },
              ],
              [
                {
                  text:
                    'Система Уровней Владения Иностранными Языками Свободы Слова',
                  rowSpan: 2,
                },
                { text: 'Beginner', colSpan: 2, alignment: 'center' },
                '',
                { text: 'Elementary', colSpan: 2, alignment: 'center' },
                '',
                { text: 'Pre-Intermediate', colSpan: 2, alignment: 'center' },
                '',
                { text: 'Intermediate', colSpan: 2, alignment: 'center' },
                '',
                { text: 'Upper-Intermediate', colSpan: 2, alignment: 'center' },
                '',
                { text: 'Advanced', alignment: 'center' },
              ],
              [
                '',
                { text: 'Absolute', alignment: 'center' },
                { text: 'False', alignment: 'center' },
                { text: 'Entry', alignment: 'center' },
                { text: 'Confident', alignment: 'center' },
                { text: 'Entry', alignment: 'center' },
                { text: 'Confident', alignment: 'center' },
                { text: 'Entry', alignment: 'center' },
                { text: 'Confident', alignment: 'center' },
                { text: 'Entry', alignment: 'center' },
                { text: 'Confident', alignment: 'center' },
                { text: 'Competent', alignment: 'center' },
              ],
              ['Баллы для автоматического подсчета итогов тестирования',
                { text: '1', alignment: 'center'},
                { text: '8.4', alignment: 'center'},
                { text: '17.1', alignment: 'center'},
                { text: '26.5', alignment: 'center'},
                { text: '35.1', alignment: 'center'},
                { text: '44.7', alignment: 'center'},
                { text: '54.1', alignment: 'center'},
                { text: '63.7', alignment: 'center'},
                { text: '73.1', alignment: 'center'},
                { text: '83.7', alignment: 'center'},
                { text: '100', alignment: 'center'},
              ],
              [{text: 'ЧАСТЬ I: САМОСТОЯТЕЛЬНАЯ', colSpan: 12, alignment: 'center'}, '', '', '', '', '', '', '', '', '', '', '' ],
              ['Лексика / Vocabulary',
                { text: '1', alignment: 'center'},
                { text: '2', alignment: 'center'},
                { text: '3', alignment: 'center'},
                { text: '4', alignment: 'center'},
                { text: '5', alignment: 'center'},
                { text: '6', alignment: 'center'},
                { text: '7', alignment: 'center'},
                { text: '8', alignment: 'center'},
                { text: '9', alignment: 'center'},
                { text: '10', alignment: 'center'},
                { text: '', alignment: 'center'},
              ],
              ['Грамматика / Grammar',
                { text: '', alignment: 'center'},
                { text: '1', alignment: 'center'},
                { text: '2', alignment: 'center'},
                { text: '3', alignment: 'center'},
                { text: '4', alignment: 'center'},
                { text: '5', alignment: 'center'},
                { text: '6', alignment: 'center'},
                { text: '7', alignment: 'center'},
                { text: '8', alignment: 'center'},
                { text: '9', alignment: 'center'},
                { text: '', alignment: 'center'},
              ],
              ['Восприятие на слух / Listening',
                { text: '', alignment: 'center'},
                { text: '', alignment: 'center'},
                { text: '1', alignment: 'center'},
                { text: '2', alignment: 'center'},
                { text: '3', alignment: 'center'},
                { text: '4', alignment: 'center'},
                { text: '5', alignment: 'center'},
                { text: '6', alignment: 'center'},
                { text: '7', alignment: 'center'},
                { text: '8', alignment: 'center'},
                { text: '', alignment: 'center'},
              ],
              ['Баллы для автоматического определения уровня (по самостоятельной части)',
                { text: '1', alignment: 'center'},
                { text: '3', alignment: 'center'},
                { text: '6', alignment: 'center'},
                { text: '9', alignment: 'center'},
                { text: '12', alignment: 'center'},
                { text: '15', alignment: 'center'},
                { text: '18', alignment: 'center'},
                { text: '21', alignment: 'center'},
                { text: '24', alignment: 'center'},
                { text: '27', alignment: 'center'},
                { text: '', alignment: 'center'},
              ],
              [
                {text: 'Сумма набранных баллов по самостоятельной части тестирования (отражается балл и соответствующий уровень):' },
                {text: `${content.results.levelOneValue}`, colSpan: 11, alignment: 'center'}, '', '', '', '', '', '', '', '', '', '',
              ],
              [{text: 'ЧАСТЬ II: УСТНАЯ', colSpan: 12, alignment: 'center'}, '', '', '', '', '', '', '', '', '', '', '' ],
              ['Устное владение лексико-грамматическими компетентностями / General comment on oral Assessment Bands',
                { text: '', alignment: 'center'},
                { text: '0.4', alignment: 'center'},
                { text: '1.1', alignment: 'center'},
                { text: '2.5', alignment: 'center'},
                { text: '3.1', alignment: 'center'},
                { text: '4.7', alignment: 'center'},
                { text: '6.1', alignment: 'center'},
                { text: '7.7', alignment: 'center'},
                { text: '9.1', alignment: 'center'},
                { text: '11.7', alignment: 'center'},
                { text: '12', alignment: 'center'},
              ],
              ['Уверенность и охотность при говорении / Confidence in speaking',
                { text: '', alignment: 'center'},
                { text: '1', alignment: 'center'},
                { text: '2', alignment: 'center'},
                { text: '3', alignment: 'center'},
                { text: '4', alignment: 'center'},
                { text: '5', alignment: 'center'},
                { text: '6', alignment: 'center'},
                { text: '7', alignment: 'center'},
                { text: '8', alignment: 'center'},
                { text: '9', alignment: 'center'},
                { text: '10', alignment: 'center'},
              ],
              ['Скорость речи / Speaking rate',
                { text: '', alignment: 'center'},
                { text: '1', alignment: 'center'},
                { text: '2', alignment: 'center'},
                { text: '3', alignment: 'center'},
                { text: '4', alignment: 'center'},
                { text: '5', alignment: 'center'},
                { text: '6', alignment: 'center'},
                { text: '7', alignment: 'center'},
                { text: '8', alignment: 'center'},
                { text: '9', alignment: 'center'},
                { text: '10', alignment: 'center'},
              ],
              ['Языковые клише и стандартные фразы / Using of cliché',
                { text: '', alignment: 'center'},
                { text: '1', alignment: 'center'},
                { text: '2', alignment: 'center'},
                { text: '3', alignment: 'center'},
                { text: '4', alignment: 'center'},
                { text: '5', alignment: 'center'},
                { text: '6', alignment: 'center'},
                { text: '7', alignment: 'center'},
                { text: '8', alignment: 'center'},
                { text: '9', alignment: 'center'},
                { text: '10', alignment: 'center'},
              ],
              ['Характер интерактивности речи / Interactivity of speech',
                { text: '', alignment: 'center'},
                { text: '1', alignment: 'center'},
                { text: '2', alignment: 'center'},
                { text: '3', alignment: 'center'},
                { text: '4', alignment: 'center'},
                { text: '5', alignment: 'center'},
                { text: '6', alignment: 'center'},
                { text: '7', alignment: 'center'},
                { text: '8', alignment: 'center'},
                { text: '9', alignment: 'center'},
                { text: '10', alignment: 'center'},
              ],
              ['Использование помощи русского в речи / Using of the Russian language in speech',
                { text: '', alignment: 'center'},
                { text: '1', alignment: 'center'},
                { text: '2', alignment: 'center'},
                { text: '3', alignment: 'center'},
                { text: '4', alignment: 'center'},
                { text: '5', alignment: 'center'},
                { text: '6', alignment: 'center'},
                { text: '7', alignment: 'center'},
                { text: '8', alignment: 'center'},
                { text: '9', alignment: 'center'},
                { text: '10', alignment: 'center'},
              ],
              [
                {text: 'Комментарий к фонетике и произношению / Phonetic and pronunciation' },
                {text: `${content.results.phoneticAndPronunciationSelectValue}`, colSpan: 11, alignment: 'center'},
                '', '', '', '', '', '', '', '', '', '',
              ],
              ['Баллы для автоматического определения уровня (по устной части)',
                { text: '', alignment: 'center'},
                { text: '5.4', alignment: 'center'},
                { text: '11.1', alignment: 'center'},
                { text: '17.5', alignment: 'center'},
                { text: '23.1', alignment: 'center'},
                { text: '29.7', alignment: 'center'},
                { text: '36.1', alignment: 'center'},
                { text: '42.7', alignment: 'center'},
                { text: '49.1', alignment: 'center'},
                { text: '56.7', alignment: 'center'},
                { text: '62', alignment: 'center'},
              ],
              [
                {text: 'Сумма набранных баллов по устной части тестирования (отражается балл и соответствующий уровень):' },
                {text: `${content.results.partTwoResultClearValue}`, colSpan: 11, alignment: 'center'}, '', '', '', '', '', '', '', '', '', '',
              ],
            ],
          },
        },
        {
          table: {
            widths: [50, 'auto'],
            body: this.getContentDescriptionTable(content.results.descriptions),
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        title: {
          fontSize: 14,
          italics: true,
          color: 'blue',
        },
      },
      defaultStyle: {
        columnGap: 20,
      },
    };

    return out;
  }

  private getContentDescriptionTable(descriptions: any): any {
    const out = [];
    for (const d of descriptions) {
      out.push([
        { text: d.category, colSpan: 2 },
        { text: ''},
      ]);
      out.push([
        { text: d.level },
        { text: d.description},
      ]);
    }
    return out;
  }
}
