/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Descriptions')
export class Descriptions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'description',
    type: 'text',
    nullable: true,
  })
  public description: string;

  @Column({
    name: 'test',
    type: 'int',
    default: 1,
    nullable: true,
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
    name: 'min',
    type: 'float',
    default: 0,
    nullable: true,
  })
  public v1: number;

  @Column({
    name: 'max',
    type: 'float',
    default: 0,
    nullable: true,
  })
  public v2: number;
}
