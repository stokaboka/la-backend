import { Test, TestingModule } from '@nestjs/testing';
import { Descriptions } from './descriptions.entity';
import { DescriptionsService } from './descriptions.service';
import { DescriptionsController } from './descriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Descriptions Controller', () => {
  let controller: DescriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescriptionsController],
      imports: [TypeOrmModule.forFeature([Descriptions])],
      providers: [DescriptionsService],
      exports: [DescriptionsService],
    }).compile();

    controller = module.get<DescriptionsController>(DescriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
