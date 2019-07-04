import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Courses } from './courses.entity';
import { CourseDto } from './course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Courses)
    private readonly repository: Repository<Courses>,
  ) {}

  async findOne(where: any): Promise<Courses> {
    return await this.repository.findOne({ where });
  }

  async find(params: any): Promise<any> {
    const { page, limit, sortBy, descending, filter } = params;

    let where: any[] = [];
    if (filter) {
      where = [
        { course: Like(`%${filter}%`) },
        { hours: Like(`%${filter}%`) },
        { timing: Like(`%${filter}%`) },
        { price: Like(`%${filter}%`) },
        { rem: Like(`%${filter}%`) },
      ];
    }

    const order: any = {};

    if (sortBy) {
      order[sortBy] = descending === 'true' ? 'DESC' : 'ASC';
    }

    const take = limit || 0;
    const skip = ((page || 1) - 1) * (limit || 0);

    const [result, total] = await this.repository.findAndCount({
      where,
      order,
      take,
      skip,
    });

    return {
      rows: result,
      rowsNumber: total,
    };
    // return await this.repository.find({ where });
  }

  async save(course: CourseDto): Promise<any> {
    try {
      return await this.repository.save(course);
    } catch (error) {
      return { error, course };
    }
  }
}
