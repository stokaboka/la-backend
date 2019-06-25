/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Workbook } from 'exceljs';
import { ResultReport } from './ResultReport';

// tslint:disable-next-line:no-var-requires
const unstream = require('unstream');

export class ExcelResultReport extends ResultReport {

  constructor() {
    super(ResultReport.config.xlsx);
  }

  fillCellByResultIndex(ws, index, row) {
    const ACode = 65;
    const ln: string = `${String.fromCharCode(ACode + 3 + index)}${row}`;
    const cell = ws.getCell(ln);
    cell.style = Object.create(cell.style);
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'FFFF0000'},
    };
  }

  async generate(data: any): Promise<Buffer> {

    const wb = new Workbook();
    const tmplFile = this.getTemplatePathFile();
    const saveFile = this.getOutputPathFile();

    try {
      await wb.xlsx.readFile(tmplFile);
      const ws = wb.getWorksheet(1);

      ws.getCell('B2').value = `${data.student}`;
      ws.getCell('B3').value = `${data.manager}`;
      ws.getCell('B4').value = `${data.trainer}`;
      ws.getCell('B5').value = data.date;

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
      this.fillCellByResultIndex(ws, data.results.usingOfTheRussianLanguageInSpeech, 23);
      ws.getCell('D24').value = data.results.phoneticAndPronunciationSelect_value;
      this.fillCellByResultIndex(ws, data.results.partTwoResult, 25);
      ws.getCell('D26').value = data.results.partTwoResultClear_value;

      let r = 29;
      for (const d of data.results.descriptions) {
        ws.getCell(`A${r}`).value = d.level;
        ws.getCell(`B${r}`).value = d.description;
        r += 2;
      }

      wb.xlsx.writeFile(saveFile);

      let buffer: Buffer;
      await wb.xlsx.write(unstream({}, d => {
        buffer = d;
        // tslint:disable-next-line:no-console
        console.log('buffer 1', buffer);
        return buffer;
      }));

      // tslint:disable-next-line:no-console
      console.log('buffer 2', buffer);

    } catch (e) {
      return e;
    }
    return new Buffer('nothing');
  }
}
