/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export class LevelDto {
  readonly id: number;
  readonly idUser: number;
  readonly attempt: number;
  readonly dt: Date;
  readonly test: number;
  readonly level: number;
  readonly levelCEF: string;
  readonly levelSVS: string;
  readonly manager: string;
  readonly trainer: string;
}
