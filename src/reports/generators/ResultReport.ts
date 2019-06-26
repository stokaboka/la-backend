/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export class ResultReport {

  tmplPath: string;
  tmplFile: string;
  outPath: string;
  outFile: string;

  static config: any = {
    xlsx: {
      tmplPath: `${__dirname}/../../../public/tmpl`,
      tmplFile: 'LanguageAssessmentResult_1.xlsx',
      outPath: `${__dirname}/../../../public/tmpl`,
      outFile: 'la_1.xlsx',
    },
  };

  constructor(config: any) {
    this.setConfig(config);
  }

  setTemplatePath(path: string) {
    this.tmplPath = path;
    return this;
  }

  setTemplateFile(file: string) {
    this.tmplFile = file;
    return this;
  }

  setOutputFile(file: string) {
    this.outFile = file;
    return this;
  }

  getTemplatePathFile(): string {
    return `${this.tmplPath}/${this.tmplFile}`;
  }

  getOutputPathFile(): string {
    return `${this.outPath}/${this.outFile}`;
  }

  setOutputPath(path: string) {
    this.outPath = path;
    return this;
  }

  setConfig(config: any) {
    this.tmplPath = config.tmplPath;
    this.tmplFile = config.tmplFile;
    this.outPath = config.outPath;
    this.outFile = config.outFile;
  }

  async generate(data: any): Promise<Buffer> {
    return new Buffer('ResultReport.generate: implement me');
  }

  toBuffer(dataObject: any): Promise<Buffer> {
    return Promise.reject(new Buffer('ResultReport.toBuffer: implement me'));
  }

}
