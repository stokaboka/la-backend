/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questions } from './questions.entity';
import { QuestionDto } from './dto/question.dto';

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
    const order: any = { part: 'ASC', phase: 'ASC', category: 'ASC' };
    return this.repository.find({ where, order });
  }

  async countByParams(where: any): Promise<number> {
    return this.repository.count({ where });
  }

  async save(question: QuestionDto): Promise<any> {
    try {
      return await this.repository.save(question);
    } catch (error) {
      return { error, question };
    }
  }

  async delete(question: QuestionDto): Promise<any> {
    const { id } = question;
    try {
      return await this.repository.delete({id});
    } catch (error) {
      return { error, question };
    }
  }
}
