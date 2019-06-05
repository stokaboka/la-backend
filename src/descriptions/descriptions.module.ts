/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Descriptions } from './descriptions.entity';
import { DescriptionsService } from './descriptions.service';
import { DescriptionsController } from './descriptions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Descriptions])],
  providers: [DescriptionsService],
  exports: [DescriptionsService],
  controllers: [DescriptionsController],
})
export class DescriptionsModule {}
