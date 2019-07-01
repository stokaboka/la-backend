/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { ConfigService } from '../../../config/config.service';

export class PdfDocumentDefinitionResult {

  private partPhaseStyle: any[] = [
    {part: 1, phase: 1, category: 'Vocabulary', style: 'bg-green-2'},
    {part: 1, phase: 2, category: 'Grammar', style: 'bg-deep-orange-2'},
    {part: 1, phase: 3, category: 'Listening', style: 'bg-purple-2'},
    {part: 2, phase: 1, category: 'General comment on oral Assessment Bands', style: 'bg-light-blue-1'},
    {part: 2, phase: 2, category: 'Confidence in speaking', style: 'bg-light-blue-2'},
    {part: 2, phase: 3, category: 'Speaking rate', style: 'bg-light-blue-2'},
    {part: 2, phase: 4, category: 'Using of cliché', style: 'bg-light-blue-2'},
    {part: 2, phase: 5, category: 'Interactivity of speech', style: 'bg-light-blue-2'},
    {part: 2, phase: 6, category: 'Using of the Russian language in speech', style: 'bg-light-blue-2'},
  ];

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
                { text: 'Общеевропейская Система Уровней Владения Иностранными Языками (CEF)', style: 'bg-orange-1' },
                { text: 'A1', colSpan: 3, alignment: 'center', style: 'bg-orange-1' },
                '',
                '',
                { text: 'A2', colSpan: 2, alignment: 'center', style: 'bg-orange-1'  },
                '',
                { text: 'B1', colSpan: 2, alignment: 'center', style: 'bg-orange-1'  },
                '',
                { text: 'B2', colSpan: 2, alignment: 'center', style: 'bg-orange-1'  },
                '',
                { text: 'C1', alignment: 'center', style: 'bg-orange-1'  },
                { text: 'C2', alignment: 'center', style: 'bg-orange-1'  },
              ],
              [
                {
                  text:
                    'Система Уровней Владения Иностранными Языками Свободы Слова',
                  rowSpan: 2,
                },
                { text: 'Beginner', colSpan: 2, alignment: 'center', style: 'bg-yellow' },
                '',
                { text: 'Elementary', colSpan: 2, alignment: 'center', style: 'bg-orange-11' },
                '',
                { text: 'Pre-Intermediate', colSpan: 2, alignment: 'center', style: 'bg-light-green-13' },
                '',
                { text: 'Intermediate', colSpan: 2, alignment: 'center', style: 'bg-cyan-2' },
                '',
                { text: 'Upper-Intermediate', colSpan: 2, alignment: 'center', style: 'bg-indigo-11' },
                '',
                { text: 'Advanced', alignment: 'center', style: 'bg-blue' },
              ],
              [
                '',
                { text: 'Absolute', alignment: 'center', style: 'bg-yellow' },
                { text: 'False', alignment: 'center', style: 'bg-yellow' },
                { text: 'Entry', alignment: 'center', style: 'bg-orange-11' },
                { text: 'Confident', alignment: 'center', style: 'bg-orange-11' },
                { text: 'Entry', alignment: 'center', style: 'bg-light-green-13' },
                { text: 'Confident', alignment: 'center', style: 'bg-light-green-13' },
                { text: 'Entry', alignment: 'center', style: 'bg-cyan-2' },
                { text: 'Confident', alignment: 'center', style: 'bg-cyan-2' },
                { text: 'Entry', alignment: 'center', style: 'bg-indigo-11' },
                { text: 'Confident', alignment: 'center', style: 'bg-indigo-11' },
                { text: 'Competent', alignment: 'center', style: 'bg-blue' },
              ],
              [
                { text: 'Баллы для автоматического подсчета итогов тестирования', style: 'bg-orange-1'},
                { text: '1', alignment: 'center', style: 'bg-orange-1'},
                { text: '8.4', alignment: 'center', style: 'bg-orange-1'},
                { text: '17.1', alignment: 'center', style: 'bg-orange-1'},
                { text: '26.5', alignment: 'center', style: 'bg-orange-1'},
                { text: '35.1', alignment: 'center', style: 'bg-orange-1'},
                { text: '44.7', alignment: 'center', style: 'bg-orange-1'},
                { text: '54.1', alignment: 'center', style: 'bg-orange-1'},
                { text: '63.7', alignment: 'center', style: 'bg-orange-1'},
                { text: '73.1', alignment: 'center', style: 'bg-orange-1'},
                { text: '83.7', alignment: 'center', style: 'bg-orange-1'},
                { text: '100', alignment: 'center', style: 'bg-orange-1'},
              ],
              [
                {text: 'ЧАСТЬ I: САМОСТОЯТЕЛЬНАЯ', colSpan: 12, alignment: 'center', style: 'bg-purple-11' },
                '', '', '', '', '', '', '', '', '', '', '',
              ],
              [
                {text: 'Лексика / Vocabulary', style: 'bg-green-2'},
                { text: '1', alignment: 'center', style: 'bg-green-2'},
                { text: '2', alignment: 'center', style: 'bg-green-2'},
                { text: '3', alignment: 'center', style: 'bg-green-2'},
                { text: '4', alignment: 'center', style: 'bg-green-2'},
                { text: '5', alignment: 'center', style: 'bg-green-2'},
                { text: '6', alignment: 'center', style: 'bg-green-2'},
                { text: '7', alignment: 'center', style: 'bg-green-2'},
                { text: '8', alignment: 'center', style: 'bg-green-2'},
                { text: '9', alignment: 'center', style: 'bg-green-2'},
                { text: '10', alignment: 'center', style: 'bg-green-2'},
                { text: '', alignment: 'center', style: 'bg-green-2'},
              ],
              [
                {text: 'Грамматика / Grammar', style: 'bg-deep-orange-2'},
                { text: '', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '1', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '2', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '3', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '4', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '5', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '6', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '7', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '8', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '9', alignment: 'center', style: 'bg-deep-orange-2'},
                { text: '', alignment: 'center', style: 'bg-deep-orange-2'},
              ],
              [
                {text: 'Восприятие на слух / Listening', style: 'bg-purple-2'},
                { text: '', alignment: 'center', style: 'bg-purple-2'},
                { text: '', alignment: 'center', style: 'bg-purple-2'},
                { text: '1', alignment: 'center', style: 'bg-purple-2'},
                { text: '2', alignment: 'center', style: 'bg-purple-2'},
                { text: '3', alignment: 'center', style: 'bg-purple-2'},
                { text: '4', alignment: 'center', style: 'bg-purple-2'},
                { text: '5', alignment: 'center', style: 'bg-purple-2'},
                { text: '6', alignment: 'center', style: 'bg-purple-2'},
                { text: '7', alignment: 'center', style: 'bg-purple-2'},
                { text: '8', alignment: 'center', style: 'bg-purple-2'},
                { text: '', alignment: 'center', style: 'bg-purple-2'},
              ],
              [
                {text: 'Баллы для автоматического определения уровня (по самостоятельной части)', style: 'bg-orange-1'},
                { text: '1', alignment: 'center', style: 'bg-orange-1'},
                { text: '3', alignment: 'center', style: 'bg-orange-1'},
                { text: '6', alignment: 'center', style: 'bg-orange-1'},
                { text: '9', alignment: 'center', style: 'bg-orange-1'},
                { text: '12', alignment: 'center', style: 'bg-orange-1'},
                { text: '15', alignment: 'center', style: 'bg-orange-1'},
                { text: '18', alignment: 'center', style: 'bg-orange-1'},
                { text: '21', alignment: 'center', style: 'bg-orange-1'},
                { text: '24', alignment: 'center', style: 'bg-orange-1'},
                { text: '27', alignment: 'center', style: 'bg-orange-1'},
                { text: '', alignment: 'center', style: 'bg-orange-1'},
              ],
              [
                {text: 'Сумма набранных баллов по самостоятельной части тестирования (отражается балл и соответствующий уровень):',
                  style: 'bg-orange-1' },
                {text: `${content.results.levelOneValue}`, colSpan: 11, alignment: 'center', style: 'bg-orange-1'},
                {text: '', style: 'bg-orange-1'},
                {text: '', style: 'bg-orange-1'},
                {text: '', style: 'bg-orange-1'},
                {text: '', style: 'bg-orange-1'},
                {text: '', style: 'bg-orange-1'},
                {text: '', style: 'bg-orange-1'},
                {text: '', style: 'bg-orange-1'},
                {text: '', style: 'bg-orange-1'},
                {text: '', style: 'bg-orange-1'},
                {text: '',  style: 'bg-orange-1'},
              ],
              [{text: 'ЧАСТЬ II: УСТНАЯ', colSpan: 12, alignment: 'center', style: 'bg-purple-11'}, '', '', '', '', '', '', '', '', '', '', '' ],
              [
                { text: 'Устное владение лексико-грамматическими компетентностями / General comment on oral Assessment Bands',
                  style: 'bg-light-blue-1'},
                { text: '', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '0.4', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '1.1', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '2.5', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '3.1', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '4.7', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '6.1', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '7.7', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '9.1', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '11.7', alignment: 'center', style: 'bg-light-blue-1'},
                { text: '12', alignment: 'center', style: 'bg-light-blue-1'},
              ],
              [
                { text: 'Уверенность и охотность при говорении / Confidence in speaking', style: 'bg-light-blue-2' },
                { text: '', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '1', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '2', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '3', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '4', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '5', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '6', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '7', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '8', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '9', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '10', alignment: 'center', style: 'bg-light-blue-2'},
              ],
              [
                { text: 'Скорость речи / Speaking rate', style: 'bg-light-blue-2'},
                { text: '', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '1', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '2', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '3', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '4', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '5', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '6', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '7', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '8', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '9', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '10', alignment: 'center', style: 'bg-light-blue-2'},
              ],
              [
                { text: 'Языковые клише и стандартные фразы / Using of cliché', style: 'bg-light-blue-2' },
                { text: '', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '1', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '2', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '3', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '4', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '5', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '6', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '7', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '8', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '9', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '10', alignment: 'center', style: 'bg-light-blue-2'},
              ],
              [
                { text: 'Характер интерактивности речи / Interactivity of speech', style: 'bg-light-blue-2' },
                { text: '', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '1', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '2', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '3', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '4', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '5', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '6', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '7', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '8', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '9', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '10', alignment: 'center', style: 'bg-light-blue-2'},
              ],
              [
                { text: 'Использование помощи русского в речи / Using of the Russian language in speech', style: 'bg-light-blue-2'},
                { text: '', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '1', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '2', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '3', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '4', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '5', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '6', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '7', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '8', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '9', alignment: 'center', style: 'bg-light-blue-2'},
                { text: '10', alignment: 'center', style: 'bg-light-blue-2'},
              ],
              [
                {text: 'Комментарий к фонетике и произношению / Phonetic and pronunciation', style: 'bg-light-blue-3' },
                {text: `${content.results.phoneticAndPronunciationSelectValue}`, colSpan: 11, alignment: 'center', style: 'bg-light-blue-3'},
                '', '', '', '', '', '', '', '', '', '',
              ],
              [
                { text: 'Баллы для автоматического определения уровня (по устной части)' , style: 'bg-orange-1' },
                { text: '', alignment: 'center', style: 'bg-orange-1'},
                { text: '5.4', alignment: 'center', style: 'bg-orange-1'},
                { text: '11.1', alignment: 'center', style: 'bg-orange-1'},
                { text: '17.5', alignment: 'center', style: 'bg-orange-1'},
                { text: '23.1', alignment: 'center', style: 'bg-orange-1'},
                { text: '29.7', alignment: 'center', style: 'bg-orange-1'},
                { text: '36.1', alignment: 'center', style: 'bg-orange-1'},
                { text: '42.7', alignment: 'center', style: 'bg-orange-1'},
                { text: '49.1', alignment: 'center', style: 'bg-orange-1'},
                { text: '56.7', alignment: 'center', style: 'bg-orange-1'},
                { text: '62', alignment: 'center', style: 'bg-orange-1'},
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
        'header': {
          fontSize: 18,
          bold: true,
        },
        'title': {
          fontSize: 14,
          italics: true,
          color: 'blue',
        },

        'bg-orange-1': {
          fillColor: '#fdf3e0',
        },
        'bg-orange-11': {
          fillColor: '#ffd180',
        },

        'bg-yellow': {
          fillColor: '#ffeb3b',
        },

        'bg-light-green-13': {
          fillColor: '#76ff03',
        },

        'bg-cyan-2': {
          fillColor: '#b2ebf2',
        },

        'bg-indigo-11': {
          fillColor: '#8c9eff',
        },

        'bg-blue': {
          fillColor: '#2196f3',
        },

        'bg-purple-11': {
          fillColor: '#ea80fc',
        },

        'bg-green-2': {
          fillColor: '#c8e6c9',
        },

        'bg-deep-orange-2': {
          fillColor: '#ffccbc',
        },

        'bg-purple-2': {
          fillColor: '#e1bee7',
        },

        'bg-light-blue-1': {
          fillColor: '#e1f5fe',
        },

        'bg-light-blue-2': {
          fillColor: '#b3e5fc',
        },

        'bg-light-blue-3': {
          fillColor: '#81d4fa',
        },

        'white': {
          fillColor: '#ffffff',
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
        { text: d.category, colSpan: 2, style: this.getCategoryStyle(d) },
        { text: ''},
      ]);
      out.push([
        { text: d.level },
        { text: d.description},
      ]);
    }
    return out;
  }

  private getCategoryStyle(descr: any): string {
    const out = this.partPhaseStyle.find(e => descr.category.indexOf(e.category) >= 0);
    if (out) {
      return out.style;
    }
    return 'white';
  }
}
