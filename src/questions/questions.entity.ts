/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Questions')
export class Questions {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 50,
  })
  public type: string;

  @Column({
    name: 'test',
    type: 'int',
    default: 1,
  })
  public test: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    default: '',
    nullable: true,
  })
  public name: string;

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
    name: 'question',
    type: 'text',
    nullable: true,
  })
  public question: string;

  @Column({
    name: 'answer',
    type: 'text',
    nullable: true,
  })
  public answer: string;

  @Column({
    name: 'target',
    type: 'text',
    nullable: true,
  })
  public target: string;

  @Column({
    name: 'weigths',
    type: 'varchar',
    default: '',
    nullable: true,
  })
  public weigths: string;

  @Column({
    name: 'audio',
    type: 'varchar',
    length: 255,
    default: '',
    nullable: true,
  })
  public audio: string;
}
