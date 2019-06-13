/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from './interfaces/result.interface';
import { Results } from './results.entity';

@Injectable()
export class ResultsService {
  private select: any = [
    'id',
    'idUser',
    'attempt',
    'dt',
    'test',
    'part',
    'phase',
    'level',
    'answers',
    'extra',
  ];

  constructor(
    @InjectRepository(Results)
    private readonly repository: Repository<Results>,
  ) {}

  async findAll(): Promise<Results[]> {
    return this.repository.find();
  }

  async attempts(params: any): Promise<any[]> {

    const { idUser } = params;

    const attempts: any[] = await this.repository
      .createQueryBuilder()
      .select('attempt')
      .addSelect('MAX(dt)', 'dt')
      .where('idUser = :idUser')
      .setParameter('idUser', idUser)
      .groupBy('attempt')
      .orderBy('attempt', 'ASC')
      .getRawMany();

    return attempts;
  }

  async find(params: any, query: any): Promise<any> {
    const { page, limit, sortBy, descending, filter } = query;
    const { select } = this;
    // tslint:disable-next-line:no-console
    console.log('params', params);
    // console.log('body', request.body);
    // console.log('query', request.query);

    let where: any = params;
    if (filter) {
      where = [
        // { login: Like(`%${filter}%`) },
        // { firstName: Like(`%${filter}%`) },
        // { secondName: Like(`%${filter}%`) },
        // { lastName: Like(`%${filter}%`) },
        // { role: Like(`%${filter}%`) },
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

  async findByParams(where: any): Promise<Results[]> {
    const order: any = {
      phase: 'ASC',
    };
    return this.repository.find({ where, order });
  }

  async countByParams(where: any): Promise<number> {
    return this.repository.count({ where });
  }

  async save(result: Result): Promise<any> {
    const { idUser, attempt, test, part, phase } = result;
    try {
      await this.repository.delete({ idUser, attempt, test, part, phase });
      return await this.repository.insert(result);
    } catch (error) {
      return { error, result };
    }
  }
}
