import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Descriptions } from './descriptions.entity';
import { DescriptionFind } from './dto/description.find.dto';

@Injectable()
export class DescriptionsService {

  private categories: any[] = [
    { part: 1, phase: 1, title: 'Лексика / Vocabulary' },
    { part: 1, phase: 2, title: 'Грамматика / Grammar' },
    { part: 1, phase: 3, title: 'Восприятие на слух / Listening' },

    { part: 2, phase: 1, title: 'Устное владение лексико-грамматическими компетентностями / General comment on oral Assessment Bands' },
    { part: 2, phase: 2, title: 'Уверенность и охотность при говорении / Confidence in speaking' },
    { part: 2, phase: 3, title: 'Скорость речи / Speaking rate' },
    { part: 2, phase: 4, title: 'Языковые клише и стандартные фразы / Using of cliché' },
    { part: 2, phase: 5, title: 'Характер интерактивности речи / Interactivity of speech' },
    { part: 2, phase: 6, title: 'Использование помощи русского в речи / Using of the Russian language in speech' },
    { part: 2, phase: 7, title: 'Комментарий к фонетике и произношению / Phonetic and pronunciation' },
  ];

  constructor(
    @InjectRepository(Descriptions)
    private readonly repository: Repository<Descriptions>,
  ) {}

  private getCategoryName(part: number, phase: number): string {
    const out = this.categories.find(e => e.part === part && e.phase === phase);
    if (out) {return out.title; }
    return '';
  }

  async findAll(): Promise<Descriptions[]> {
    return this.repository.find();
  }

  async findDescriptionsResults(params: any): Promise<any[]> {
    const out: any[] = [];
    const { test, results } = params;
    const items = results.split('=');

    for (const ph of items) {
      const phaseArr = ph.split('*');

      const part: number = parseInt(phaseArr[0], 10);
      const phase: number = parseInt(phaseArr[1], 10);
      const level: number = parseFloat(phaseArr[2]);
      const category: string = this.getCategoryName(part, phase);

      const descr: Descriptions = await this.repository
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

      out.push({ ...descr, level, category } );
    }

    // tslint:disable-next-line:no-console
    console.dir(out);
    return out;
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
