import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LevelsService } from './levels.service';
import { LevelDto } from './dto/level.dto';

@Controller('levels')
export class LevelsController {

  constructor(
    private readonly service: LevelsService,
  ) {}

  @Get('user/:user/test/:test/attempt/:attempt')
  @UseGuards(new JwtAuthGuard())
  async findOne(@Param() params: any): Promise<any> {
    return this.service.findOne(params);
  }

  @Post('save')
  @UseGuards(new JwtAuthGuard())
  async save(@Body() resultDto: LevelDto): Promise<any> {
    return this.service.save(resultDto);
  }

}
