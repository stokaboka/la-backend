/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tokens')
export class Tokens {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'idUser',
    type: 'int',
    unique: true,
  })
  public idUser: number;

  @Column({
    name: 'token',
    type: 'text',
  })
  public token: string;

}
