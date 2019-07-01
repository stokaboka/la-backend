/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Workbook } from 'exceljs';
import { ConfigService } from '../../../config/config.service';
import { ExcelReport } from './ExcelReport';
import { DateString } from '../../../utils/date';

export class ExcelResultReport extends ExcelReport {
  constructor(config: ConfigService) {
    super(config);
    this.tmplFile = config.templateResultExcelFile;
  }

  fillCellByResultIndex(ws, index, row) {
    const ACode = 65;
    const ln: string = `${String.fromCharCode(ACode + 3 + index)}${row}`;
    const cell = ws.getCell(ln);
    cell.style = Object.create(cell.style);
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF0000' },
    };
  }

  toPromiseBuffer(dataObject: any): Promise<Buffer> {
    return dataObject.xlsx.writeBuffer();
  }

  async createFromTemplate(data: any): Promise<Workbook> {
    const wb = new Workbook();
    const tmplFile = this.getTemplatePathFile();
    try {
      await wb.xlsx.readFile(tmplFile);
      const ws = wb.getWorksheet(1);

      ws.getCell('B2').value = `${data.student}`;
      ws.getCell('B3').value = `${data.manager}`;
      ws.getCell('B4').value = `${data.trainer}`;
      ws.getCell('B5').value = DateString.dateToString(data.date, 'DD.MM.YYYY');
      ws.getCell('B6').value = `${data.results.finalLevelEurope} - ${data.results.finalLevelSVS}`;

      this.fillCellByResultIndex(ws, data.results.finalLevel, 10);
      this.fillCellByResultIndex(ws, data.results.vocabularyLevel, 12);
      this.fillCellByResultIndex(ws, data.results.grammarLevel, 13);
      this.fillCellByResultIndex(ws, data.results.listeningLevel, 14);
      this.fillCellByResultIndex(ws, data.results.levelOne, 15);
      ws.getCell('D16').value = data.results.levelOne_value;

      this.fillCellByResultIndex(ws, data.results.partTwoResultAnswers, 18);
      this.fillCellByResultIndex(ws, data.results.confidenceInSpeaking, 19);
      this.fillCellByResultIndex(ws, data.results.speakingRate, 20);
      this.fillCellByResultIndex(ws, data.results.usingOfCliche, 21);
      this.fillCellByResultIndex(ws, data.results.interactivityOfSpeech, 22);
      this.fillCellByResultIndex(
        ws,
        data.results.usingOfTheRussianLanguageInSpeech,
        23,
      );
      ws.getCell('D24').value =
        data.results.phoneticAndPronunciationSelect_value;
      this.fillCellByResultIndex(ws, data.results.partTwoResult, 25);
      ws.getCell('D26').value = data.results.partTwoResultClear_value;

      let r = 29;
      for (const d of data.results.descriptions) {
        ws.getCell(`A${r}`).value = d.level;
        ws.getCell(`B${r}`).value = d.description;
        r += 2;
      }

      return wb;
      // wb.xlsx.writeFile(saveFile);
    } catch (e) {
      throw e;
    }
  }

  async generate(data: any): Promise<Buffer> {
    try {
      const wb = await this.createFromTemplate(data);
      return await this.toPromiseBuffer(wb);
    } catch (e) {
      return Promise.resolve(new Buffer(e));
    }
  }
}
