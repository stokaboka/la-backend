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
  constructor(
    @InjectRepository(Results)
    private readonly repository: Repository<Results>,
  ) {}

  async findAll(): Promise<Results[]> {
    return this.repository.find();
  }

  async find(where: any): Promise<Results[]> {
    const order: any = {
      phase: 'ASC',
    }
    return this.repository.find({where, order});
  }

  async count(where: any): Promise<number> {
    return this.repository.count({where});
  }

  async save(result: Result): Promise<any> {
    const { idUser, attempt, test, part, phase } = result
    try {
      await this.repository.delete({ idUser, attempt, test, part, phase });
      return await this.repository.insert(result);
    } catch (error) {
      return { error, result };
    }
  }
}
