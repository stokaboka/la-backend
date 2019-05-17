/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private select: any = [
    'id',
    'login',
    'firstName',
    'secondName',
    'lastName',
    'email',
    'phone',
    'regDate',
    'lastDate',
    'updDate',
    'role',
    'avatar',
    'attempt',
    'closed',
    'birthday',
  ];

  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
  ) {}

  async signIn(user: User): Promise<Users[]> {
    const data: Users[] = await this.repository.find({
      select: this.select,
      where: { login: user.login, password: user.password },
    });
    return data;
  }

  async register(user: User): Promise<any> {
    try {
      const savedUser: any = await this.repository.save(user);
      if (Array.isArray(savedUser)) {
        savedUser.forEach(e => {
          this.fixObject(e);
        }, this);
      } else {
        this.fixObject(savedUser);
      }
      return savedUser;
    } catch (error) {
      return { error, user };
    }
  }

  async findAll(): Promise<Users[]> {
    return await this.repository.find({ select: this.select });
  }

  async findOneById(id: number): Promise<Users[]> {
    return await this.repository.find({
      select: this.select,
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<Users[]> {
    return await this.repository.find({
      select: this.select,
      where: { email },
    });
  }

  fixObject(obj: any) {
    delete obj.password;
    delete obj.secretAnswer;
    delete obj.secretQuestion;
  }
}
