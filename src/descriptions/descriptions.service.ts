import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Descriptions } from './descriptions.entity';
import { DescriptionFind } from './dto/description.find.dto';

@Injectable()
export class DescriptionsService {
  constructor(
    @InjectRepository(Descriptions)
    private readonly repository: Repository<Descriptions>,
  ) {}

  async findAll(): Promise<Descriptions[]> {
    return this.repository.find();
  }

  async findOne(params: DescriptionFind): Promise<Descriptions> {
    const { test, part, phase, level } = params;

    const description: Descriptions = await this.repository
      .createQueryBuilder()
      .where('test = :test')
      .andWhere('part = :part')
      .andWhere('phase = :phase')
      .andWhere('min <= :level')
      .andWhere(':level <= max')
      .setParameter('test', test)
      .setParameter('part', part)
      .setParameter('phase', phase)
      .setParameter('level', level)
      .getOne();

    // tslint:disable-next-line:no-console
    console.dir(description);
    return description;
  }
}
