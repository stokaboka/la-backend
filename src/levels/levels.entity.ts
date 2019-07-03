/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Levels')
export class Levels {
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
    name: 'level',
    type: 'float',
    default: 0,
    nullable: true,
  })
  public level: number;

  @Column({
    name: 'levelCEF',
    type: 'varchar',
    length: 255,
  })
  public levelCEF: string;

  @Column({
    name: 'levelSVS',
    type: 'varchar',
    length: 255,
  })
  public levelSVS: string;

  @Column({
    name: 'manager',
    type: 'varchar',
    length: 255,
  })
  public manager: string;

  @Column({
    name: 'trainer',
    type: 'varchar',
    length: 255,
  })
  public trainer: string;
}
