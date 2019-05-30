/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export class ResultDto {
  readonly id: number;
  readonly idUser: number;
  readonly attempt: number;
  readonly dt: Date;
  readonly test: number;
  readonly part: number;
  readonly phase: number;
  readonly level: number;
  readonly answers: string;
  readonly extra: string;
}
