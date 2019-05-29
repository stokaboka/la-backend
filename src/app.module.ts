/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { QuestionsModule } from './questions/questions.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    TokensModule,
    QuestionsModule,
    ResultsModule,
  ],
  controllers: [AppController, QuestionsController],
  providers: [AppService, AuthService, QuestionsService],
  exports: [AuthModule, UsersModule, TokensModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
