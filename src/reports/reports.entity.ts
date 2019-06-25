/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Reports')
export class Reports {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'idUser',
    type: 'int',
  })
  public idUser: number;

  @Column({
    name: 'attempt',
    type: 'int',
    default: 1,
  })
  public attempt: number;

  @Column({
    name: 'dt',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public dt: Date;

  @Column({
    name: 'test',
    type: 'int',
    default: 1,
  })
  public test: number;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
  })
  public type: string;

  @Column({
    name: 'data',
    type: 'json',
    nullable: true,
  })
  public data: object;
}
