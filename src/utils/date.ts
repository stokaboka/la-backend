/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export class DateString {

  static getElement(arr: any[], idx: number): string {
    if (arr && arr.length > idx) {
      return arr[idx];
    }
    return '';
  }

  static dateToString(date: any, format: string): string {
    let out = '';
    if (date) {
      // 2019-07-01T11:37:57.930Z
      const parts = date.split('T');
      const dateParts = DateString.getElement(parts, 0).split('-');
      const timeParts = DateString.getElement(parts, 1).split(':');

      const yyyy = DateString.getElement(dateParts, 0);
      const yy = yyyy.substr(2);
      const mm = DateString.getElement(dateParts, 1);
      const dd = DateString.getElement(dateParts, 2);

      const hh = DateString.getElement(timeParts, 0);
      const mi = DateString.getElement(timeParts, 1);

      const sesmsec = DateString.getElement(timeParts, 2).split('.');
      const sec = DateString.getElement(sesmsec, 0);
      const msec = DateString.getElement(sesmsec, 1);

      out = format;
      out = out.replace('DD', dd);
      out = out.replace('MM', mm);
      out = out.replace('YYYY', yyyy);
      out = out.replace('YY', yy);
      out = out.replace('HH', hh);
      out = out.replace('MI', mi);
      out = out.replace('SS', sec);
      out = out.replace('MS', msec);
      return out;
    }
    return out;
  }
}
