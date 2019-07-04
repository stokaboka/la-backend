import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async find(where: any): Promise<Courses[]> {
    return await this.repository.find({ where });
  }

  async save(course: CourseDto): Promise<any> {
    try {
      return await this.repository.save(course);
    } catch (error) {
      return { error, course };
    }
  }
}
