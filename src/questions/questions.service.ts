/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './interfaces/question.interface';
import { Questions } from './questions.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly repository: Repository<Questions>,
  ) {}

  async findAll(): Promise<Questions[]> {
    return this.repository.find();
  }

  async find(where: any): Promise<any> {
    return this.repository.find({ where });
    const [result, total] = await this.repository.findAndCount({ where });

    return {
      rows: result,
      rowsNumber: total,
    };
  }

  async findByParams(where: any): Promise<Questions[]> {
    return this.repository.find({ where });
  }

  async countByParams(where: any): Promise<number> {
    return this.repository.count({ where });
  }
}
