import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Courses } from './courses.entity';
import { CourseDto } from './course.dto';
import { QueryParams } from '../utils/query.params';

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

    const fields: string = 'course, hours, timing, price, rem';
    const queryParams = QueryParams.prepare(params, fields.split(', '));

    const [result, total] = await this.repository.findAndCount(queryParams);

    return {
      rows: result,
      rowsNumber: total,
    };
  }

  async save(course: CourseDto): Promise<any> {
    try {
      return await this.repository.save(course);
    } catch (error) {
      return { error, course };
    }
  }

  async remove(course: CourseDto): Promise<any> {
    const { id } = course;
    try {
      return await this.repository.delete({id});
    } catch (error) {
      return { error, course };
    }
  }
}
