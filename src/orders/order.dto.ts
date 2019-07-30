/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export class OrderDto {
  readonly id: number;
  readonly idUser: number;
  readonly dt: Date;
  readonly currentLevelCEFR: string;
  readonly currentLevelSVS: string;
  readonly targetLevelCEFR: string;
  readonly targetLevelSVS: string;
  readonly student: string;
  readonly manager: string;
  readonly trainer: string;
}
