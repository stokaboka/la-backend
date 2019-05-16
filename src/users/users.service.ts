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
  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
  ) {}

  async signIn(user: User): Promise<Users[]> {
    const data: Users[] =  await this.repository.find({
      where: { login: user.login, password: user.password },
    });
    data.forEach(e => {
        delete e.password;
        delete e.secretAnswer;
        delete e.secretQuestion;
    });
    return data;
  }

  async register(user: User): Promise<any> {
    try {
      const savedUser: any = await this.repository.save( user );
      return savedUser;
    } catch (error) {
      return {error, user};
      }
    }

  async findAll(): Promise<Users[]> {
    return await this.repository.find();
  }

  async findOneByEmail(email: string): Promise<Users[]> {
    return await this.repository.find({where: {email}});
  }
}
