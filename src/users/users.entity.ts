/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Users')
export class Users {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'login',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  public login: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
  })
  public password: string;

  @Column({
    name: 'firstName',
    type: 'varchar',
    length: 255,
  })
  public firstName: string;

  @Column({
    name: 'secondName',
    type: 'varchar',
    default: '-',
    length: 255,
  })
  public secondName: string;

  @Column({
    name: 'lastName',
    type: 'varchar',
    length: 255,
  })
  public lastName: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    default: '',
  })
  public email: string;

  @Column({
    name: 'phone',
    type: 'varchar',
    length: 45,
    default: '',
  })
  public phone: string;

  @CreateDateColumn({
    name: 'regDate',
    type: 'datetime',
    default: null,
    // default: new Date(),
  })
  public regDate: Date;

  @Column({
    name: 'lastDate',
    type: 'datetime',
    default: null,
  })
  public lastDate: Date;

  @UpdateDateColumn({
    name: 'updDate',
    type: 'datetime',
    default: null,
    // default: new Date(),
  })
  public updDate: Date;

  @Column({
    name: 'secretQuestion',
    type: 'varchar',
    length: 255,
    default: '',
  })
  public secretQuestion: string;

  @Column({
    name: 'secretAnswer',
    type: 'varchar',
    length: 255,
    default: '',
  })
  public secretAnswer: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 255,
    default: 'USER',
  })
  public role: string;

  @Column({
    name: 'avatar',
    type: 'varchar',
    length: 255,
    default: '',
  })
  public avatar: string;

  @Column({
    name: 'attempt',
    type: 'int',
    default: 1,
  })
  public attempt: number;

  @Column({
    name: 'closed',
    type: 'int',
    default: 0,
  })
  public closed: number;

  @Column({
    name: 'birthday',
    type: 'datetime',
    default: null,
    // default: new Date(),
  })
  public birthday: Date;

}
