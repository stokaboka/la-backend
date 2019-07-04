/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('OrderDetails')
export class OrderDetails {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'idOrder',
    type: 'int',
  })
  public idOrder: number;

  @Column({
    name: 'num',
    type: 'int',
  })
  public num: number;

  @Column({
    name: 'course',
    type: 'varchar',
    length: 255,
  })
  public course: string;

  @Column({
    name: 'target',
    type: 'varchar',
    length: 255,
  })
  public target: string;

  @Column({
    name: 'hours',
    type: 'float',
  })
  public hours: number;

  @Column({
    name: 'price',
    type: 'float',
  })
  public price: number;

  @Column({
    name: 'cost',
    type: 'float',
  })
  public cost: number;

  @Column({
    name: 'timing',
    type: 'varchar',
    length: 255,
  })
  public timing: string;

  @Column({
    name: 'rem',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  public rem: string;
}
