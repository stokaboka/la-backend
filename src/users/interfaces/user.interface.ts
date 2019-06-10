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
  readonly regDate: Date;
  readonly lastDate: Date;
  readonly updDate: Date;
  readonly role: string;
  readonly avatar: string;
  readonly attempt: number;
  readonly closed: number;
  readonly birthday: Date;
}
