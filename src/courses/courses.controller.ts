import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
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

  @Put()
  @UseGuards(new JwtAuthGuard())
  update(@Body() course: CourseDto): Promise<any> {
    return this.service.save(course);
  }

  @Post()
  @UseGuards(new JwtAuthGuard())
  insert(@Body() course: CourseDto): Promise<any> {
    return this.service.save(course);
  }

  @Delete()
  @UseGuards(new JwtAuthGuard())
  remove(@Body() course: CourseDto): Promise<any> {
    return this.service.remove(course);
  }
}
