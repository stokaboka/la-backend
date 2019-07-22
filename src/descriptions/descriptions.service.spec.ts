import { Test, TestingModule } from '@nestjs/testing';
import { DescriptionsService } from './descriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descriptions } from './descriptions.entity';
import { DescriptionsController } from './descriptions.controller';

describe('DescriptionsService', () => {
  let service: DescriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Descriptions])],
      providers: [DescriptionsService],
      exports: [DescriptionsService],
      controllers: [DescriptionsController],
    }).compile();

    service = module.get<DescriptionsService>(DescriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
