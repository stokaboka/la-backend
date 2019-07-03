/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export class ReportsDto {
  readonly id: number;
  readonly idUser: number;
  readonly attempt: number;
  readonly dt: Date;
  readonly test: number;
  readonly type: string;
  readonly data: object;
  readonly level: number;
  readonly levelCEF: string;
  readonly levelSVS: string;
}
