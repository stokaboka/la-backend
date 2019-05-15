/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
  })
  public email: string;

  @Column({
    name: 'nick',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  public nick: string;

  @Column({
    name: 'pass',
    type: 'varchar',
    length: 255,
  })
  public pass: string;

  // @PrimaryGeneratedColumn()
  // public id: number;
  //
  // @Column({
  //   name: 'login',
  //   type: 'varchar',
  //   length: 255,
  //   unique: true,
  // })
  // public login: string;
  //
  // @Column({
  //   name: 'password',
  //   type: 'varchar',
  //   length: 255,
  // })
  // public password: string;
  //
  // @Column({
  //   name: 'firstName',
  //   type: 'varchar',
  //   length: 255,
  // })
  // public firstName: string;
  //
  // @Column({
  //   name: 'secondName',
  //   type: 'varchar',
  //   default: '-',
  //   length: 255,
  // })
  // public secondName: string;
  //
  // @Column({
  //   name: 'lastName',
  //   type: 'varchar',
  //   length: 255,
  // })
  // public lastName: string;
  //
  // @Column({
  //   name: 'birthday',
  //   type: 'datetime',
  //   default: new Date(),
  // })
  // public birthday: Date;
  //
  // @Column({
  //   name: 'email',
  //   type: 'varchar',
  //   length: 255,
  // })
  // public email: string;
  //
  // @Column({
  //   name: 'role',
  //   type: 'varchar',
  //   length: 255,
  // })
  // public role: string;
}
