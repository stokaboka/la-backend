import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CoursesService } from './courses.service';
import { CourseDto } from './course.dto';

@Controller('courses')
export class CoursesController {

  constructor(private readonly service: CoursesService) {}

  @Get()
  @UseGuards(new JwtAuthGuard())
  find(@Query() params): Promise<any> {
    return this.service.find(params);
  }

  @Post()
  @UseGuards(new JwtAuthGuard())
  save(@Body() course: CourseDto): Promise<any> {
    return this.service.save(course);
  }
}
