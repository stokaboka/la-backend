import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportsDto } from './dto/reports.dto';
import { Reports } from './reports.entity';
import { ResultReport } from './generators/ResultReport';
import { ExcelResultReport } from './generators/ExcelResultReport';
import { Readable } from 'stream';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Reports)
    private readonly repository: Repository<Reports>,
  ) {}

  async save(data: ReportsDto): Promise<any> {
    const { idUser, attempt, test } = data;
    try {
      await this.repository.delete({ idUser, attempt, test });
      const out = await this.repository.insert(data);
      return out;
    } catch (error) {
      return { error, data };
    }
  }

  async reportFile(params: any, format: string): Promise<any> {
    const { user: idUser, attempt, test } = params;
    let resultReport: ResultReport;
    try {
      const report = await this.repository.findOne({
        where: { idUser, attempt, test },
      });

      switch (format.toUpperCase()) {
        case 'XLSX':
          resultReport = new ExcelResultReport();
          break;
      }

      if (resultReport) {
        const result = await resultReport.generate(report.data);
        // tslint:disable-next-line:no-console
        console.log('result', result);
        return result;
      }
      return 'unsupported format';
    } catch (error) {
      return { error, params };
    }
  }

  // async xlsx(data: any): Promise<any> {
  //
  //   const wb = new Workbook();
  //   const tmplFile = `${__dirname}/../../public/tmpl/LanguageAssessmentResult_1.xlsx`;
  //   const saveFile = `${__dirname}/../../public/tmpl/la_1.xlsx`;
  //
  //   // tslint:disable-next-line:no-console
  //   // console.log(data);
  //
  //   try {
  //     await wb.xlsx.readFile(tmplFile);
  //     const ws = wb.getWorksheet(1);
  //     // ws.mergeCells('B2:K2');
  //     // ws.mergeCells('B3:K3');
  //     ws.getCell('B2').value = `${data.student.firstName} ${data.student.secondName} ${data.student.lastName}`;
  //     ws.getCell('B4').value = `${data.manager.firstName} ${data.manager.secondName} ${data.manager.lastName}`;
  //     ws.getCell('B5').value = data.date;
  //
  //     this.fillCellByResultIndex(ws, data.results.finalLevel, 10);
  //     this.fillCellByResultIndex(ws, data.results.vocabularyLevel, 12);
  //     this.fillCellByResultIndex(ws, data.results.grammarLevel, 13);
  //     this.fillCellByResultIndex(ws, data.results.listeningLevel, 14);
  //     this.fillCellByResultIndex(ws, data.results.levelOne, 15);
  //     ws.getCell('D16').value = data.results.levelOne_value;
  //
  //     this.fillCellByResultIndex(ws, data.results.partTwoResultAnswers, 18);
  //     this.fillCellByResultIndex(ws, data.results.confidenceInSpeaking, 19);
  //     this.fillCellByResultIndex(ws, data.results.speakingRate, 20);
  //     this.fillCellByResultIndex(ws, data.results.usingOfCliche, 21);
  //     this.fillCellByResultIndex(ws, data.results.interactivityOfSpeech, 22);
  //     this.fillCellByResultIndex(ws, data.results.usingOfTheRussianLanguageInSpeech, 23);
  //     ws.getCell('D24').value = data.results.phoneticAndPronunciationSelect_value;
  //     this.fillCellByResultIndex(ws, data.results.partTwoResult, 25);
  //     ws.getCell('D26').value = data.results.partTwoResultClear_value;
  //
  //     let r = 29;
  //     for (const d of data.results.descriptions) {
  //       ws.getCell(`A${r}`).value = d.level;
  //       ws.getCell(`B${r}`).value = d.description;
  //       r += 2;
  //     }
  //
  //     wb.xlsx.writeFile(saveFile);
  //   } catch (e) {
  //     return e;
  //   }
  //   return 'ok';
  // }
}
