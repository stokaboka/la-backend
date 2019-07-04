/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Courses')
export class Courses {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'course',
    type: 'varchar',
    length: 255,
  })
  public course: string;

  @Column({
    name: 'hours',
    type: 'float',
  })
  public hours: number;

  @Column({
    name: 'timing',
    type: 'varchar',
    length: 255,
  })
  public timing: string;

  @Column({
    name: 'price',
    type: 'float',
  })
  public price: number;

  @Column({
    name: 'comment',
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  public comment: string;
}
