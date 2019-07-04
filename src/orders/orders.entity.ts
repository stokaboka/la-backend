/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Orders')
export class Orders {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'idUser',
    type: 'int',
  })
  public idUser: number;

  @Column({
    name: 'dt',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public dt: Date;

  @Column({
    name: 'currentLevelCEF',
    type: 'varchar',
    length: 255,
  })
  public currentLevelCEF: string;

  @Column({
    name: 'currentLevelSVS',
    type: 'varchar',
    length: 255,
  })
  public currentLevelSVS: string;

  @Column({
    name: 'targetLevelCEF',
    type: 'varchar',
    length: 255,
  })
  public targetLevelCEF: string;

  @Column({
    name: 'targetLevelSVS',
    type: 'varchar',
    length: 255,
  })
  public targetLevelSVS: string;

  @Column({
    name: 'student',
    type: 'varchar',
    length: 255,
  })
  public student: string;

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
