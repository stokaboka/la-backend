/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */
import * as fs from 'fs';
import * as path from 'path';

export class Base64 {

  static encodeFileSync(file: string): string {
    // read binary data
    const bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
  }

  static decodeFileSync(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    const bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
  }

  static imageToDataUri(file: string): string {
    const ext: string = path.extname(file).toLowerCase();
    const base64: string = Base64.encodeFileSync(file);
    return `data:image/${ext};base64,${base64}`;
  }
}
