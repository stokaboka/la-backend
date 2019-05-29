/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './interfaces/answer.interface';
import { Answers } from './answers.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answers)
    private readonly repository: Repository<Answers>,
  ) {}

  async findAll(): Promise<Answers[]> {
    return this.repository.find();
  }

  async findByParams(where: any): Promise<Answers[]> {
    return this.repository.find({where});
  }

  async countByParams(where: any): Promise<number> {
    return this.repository.count({where});
  }

  async save(answer: Answer): Promise<any> {
    try {
      return await this.repository.save(answer);
    } catch (error) {
      return { error, answer };
    }
  }
}
