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

  async findByParams(where: any): Promise<Results[]> {
    return this.repository.find({where});
  }

  async countByParams(where: any): Promise<number> {
    return this.repository.count({where});
  }

  async save(result: Result): Promise<any> {
    try {
      return await this.repository.save(result);
    } catch (error) {
      return { error, result };
    }
  }
}
