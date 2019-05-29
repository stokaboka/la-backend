/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { Results } from './results.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Results])],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
