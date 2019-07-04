import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { DescriptionsService } from './descriptions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DescriptionFind } from './dto/description.find.dto';

@Controller('descriptions')
export class DescriptionsController {
  constructor(readonly descriptionsService: DescriptionsService) {}

  @Get('test/:test/results/:results')
  @UseGuards(new JwtAuthGuard())
  async findOne(@Param() params: DescriptionFind): Promise<any[]> {
    return this.descriptionsService.findDescriptionsResults(params);
  }
}
