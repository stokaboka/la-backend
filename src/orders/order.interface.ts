/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export interface OrderInterface {
  readonly id: number;
  readonly idUser: number;
  readonly dt: Date;
  readonly currentLevelCEF: string;
  readonly currentLevelSVS: string;
  readonly targetLevelCEF: string;
  readonly targetLevelSVS: string;
  readonly student: string;
  readonly manager: string;
  readonly trainer: string;
}
