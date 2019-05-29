/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Results')
export class Results {
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
    name: 'part',
    type: 'int',
    default: 0,
    nullable: true,
  })
  public part: number;

  @Column({
    name: 'phase',
    type: 'int',
    default: 0,
    nullable: true,
  })
  public phase: number;

  @Column({
    name: 'category',
    type: 'int',
    default: 0,
    nullable: true,
  })
  public category: number;

  @Column({
    name: 'answers',
    type: 'text',
    nullable: true,
  })
  public answers: string;

  @Column({
    name: 'extra',
    type: 'text',
    nullable: true,
  })
  public extra: string;

}
