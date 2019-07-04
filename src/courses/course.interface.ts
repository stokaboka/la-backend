/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export interface CourseInterface {
  readonly id: number;
  readonly course: string;
  readonly hours: number;
  readonly timing: string;
  readonly price: number;
  readonly comment: string;
}
