import { Injectable } from '@nestjs/common';
import { Levels } from './levels.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './interfaces/level.interface';

@Injectable()
export class LevelsService {

  constructor(
    @InjectRepository(Levels)
    private readonly repository: Repository<Levels>,
  ) {}

  async findOne(where: any): Promise<Levels> {
    return await this.repository.findOne({where});
  }

  async save(level: Level): Promise<any> {
    const { idUser, attempt, test } = level;
    try {
      await this.repository.delete({ idUser, attempt, test });
      return await this.repository.insert(level);
    } catch (error) {
      return { error, level };
    }
  }

}
