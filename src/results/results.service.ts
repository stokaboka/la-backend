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
  public static SELECT_RESULTS: string[] = [
    'id',
    'idUser',
    'attempt',
    'part',
    'level',
  ];
  public static SELECT_RESULT: string[] = [
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

  async find(select: string[], where: any): Promise<Results[]> {
    const order: any = {
      phase: 'ASC',
    };
    return this.repository.find({ select, where, order });
  }

  async count(where: any): Promise<number> {
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
