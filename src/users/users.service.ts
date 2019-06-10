/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { User } from './interfaces/user.interface';
import { UserFixDto } from './dto/user.fix.dto';
import { UserDto } from './dto/user.dto';

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

  async signIn(user: User): Promise<Users> {
    const data: Users = await this.repository.findOne({
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

  async find(params: any): Promise<any> {
    const { page, limit, sortBy, descending, filter } = params;
    const { select } = this;
    // console.log('params', request.params);
    // console.log('body', request.body);
    // console.log('query', request.query);

    let where: any[] = [];
    if (filter) {
      where = [
        { login: Like(`%${filter}%`) },
        { firstName: Like(`%${filter}%`) },
        { secondName: Like(`%${filter}%`) },
        { lastName: Like(`%${filter}%`) },
        { role: Like(`%${filter}%`) },
      ];
    }

    const order: any = {};

    if (sortBy) {
      order[sortBy] = descending === 'true' ? 'DESC' : 'ASC';
    }

    const take = limit || 10;
    const skip = ((page || 1) - 1) * (limit || 0);

    const [result, total] = await this.repository.findAndCount({
      select,
      where,
      order,
      take,
      skip,
    });

    return {
      rows: result,
      rowsNumber: total,
    };
  }

  async countAll(): Promise<number> {
    return await this.repository.count();
  }

  async findOneById(id: number): Promise<Users> {
    return await this.repository.findOne({
      select: this.select,
      where: { id },
    });
  }

  async findOneByEmail(email: string): Promise<Users> {
    return await this.repository.findOne({
      select: this.select,
      where: { email },
    });
  }

  async fix(userfixDto: UserFixDto): Promise<any> {
    // tslint:disable-next-line:no-console
    console.dir(userfixDto);
    const { id } = userfixDto;
    await this.repository.update({ id }, { closed: 1 });
    return await this.findOneById(id);
  }

  async unfix(userfixDto: UserFixDto): Promise<any> {
    // tslint:disable-next-line:no-console
    console.dir(userfixDto);
    const { id } = userfixDto;
    const row: any = await this.repository.findOne(id);
    let { attempt } = row;
    attempt++;
    // tslint:disable-next-line:no-console
    console.log(row, attempt);
    await this.repository.update({ id }, { closed: 0, attempt });
    return await this.findOneById(id);
  }

  async update(user: User): Promise<any> {
    const { id } = user;
    const dt = await this.repository.update({ id }, user);
    return dt;
  }

  fixObject(obj: any) {
    delete obj.password;
    delete obj.secretAnswer;
    delete obj.secretQuestion;
  }
}
