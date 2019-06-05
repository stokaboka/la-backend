import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { DescriptionsService } from './descriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Descriptions } from './descriptions.entity';
import { DescriptionFind } from './dto/description.find.dto';

@Controller('descriptions')
export class DescriptionsController {
  constructor(readonly descriptionsService: DescriptionsService) {}

  @Get('all')
  @UseGuards(new JwtAuthGuard())
  async findAll(): Promise<Descriptions[]> {
    return this.descriptionsService.findAll();
  }

  @Get('find')
  @UseGuards(new JwtAuthGuard())
  async findOne(@Param() params: DescriptionFind): Promise<Descriptions> {
    return this.descriptionsService.findOne(params);
  }
}
