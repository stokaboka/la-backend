import { Test, TestingModule } from '@nestjs/testing';
import { DescriptionsService } from './descriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descriptions } from './descriptions.entity';

describe('DescriptionsService', () => {
  let service: DescriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Descriptions])],
      providers: [DescriptionsService],
    }).compile();

    service = module.get<DescriptionsService>(DescriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
