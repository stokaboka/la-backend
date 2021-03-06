/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export class QuestionDto {
  readonly id: number;
  readonly type: string;
  readonly test: number;
  readonly name: string;
  readonly part: number;
  readonly phase: number;
  readonly category: number;
  readonly question: string;
  readonly answer: string;
  readonly target: string;
  readonly weigths: string;
  readonly audio: string;
}
