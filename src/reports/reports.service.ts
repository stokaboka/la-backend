import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { Workbook } from 'exceljs';

@Injectable()
export class ReportsService {

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

  async xlsx(data: any): Promise<any> {

    const wb = new Workbook();
    const tmplFile = `${__dirname}/../../public/tmpl/LanguageAssessmentResult_1.xlsx`;
    const saveFile = `${__dirname}/../../public/tmpl/la_1.xlsx`;

    // tslint:disable-next-line:no-console
    // console.log(data);

    try {
      await wb.xlsx.readFile(tmplFile);
      const ws = wb.getWorksheet(1);
      // ws.mergeCells('B2:K2');
      // ws.mergeCells('B3:K3');
      ws.getCell('B2').value = `${data.student.firstName} ${data.student.secondName} ${data.student.lastName}`;
      ws.getCell('B4').value = `${data.manager.firstName} ${data.manager.secondName} ${data.manager.lastName}`;
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
    } catch (e) {
      return e;
    }
    return 'ok';
  }
}
