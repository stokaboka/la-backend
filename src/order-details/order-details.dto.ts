/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export class OrderDetailsDto {
  readonly id: number;
  readonly idOrder: number;
  readonly num: number;
  readonly course: string;
  readonly target: string;
  readonly hours: number;
  readonly price: number;
  readonly cost: number;
  readonly timing: string;
  readonly comment: string;
}
