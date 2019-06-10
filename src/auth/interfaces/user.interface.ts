/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

export interface User {
  readonly id: number;
  readonly login: string;
  readonly password: string;
  readonly firstName: string;
  readonly secondName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly birthday: Date;
}
