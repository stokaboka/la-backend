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
import { DescriptionsModule } from './descriptions/descriptions.module';
import { DescriptionsController } from './descriptions/descriptions.controller';
import { DescriptionsService } from './descriptions/descriptions.service';
import { ResultsController } from './results/results.controller';
import { ResultsService } from './results/results.service';
import { AttemptsController } from './attempts/attempts.controller';
import { ResultsModule } from './results/results.module';
import { ReportsModule } from './reports/reports.module';
import { ConfigModule } from './config/config.module';
import { ClientModule } from './client/client.module';
import { LevelsModule } from './levels/levels.module';
import { LevelsController } from './levels/levels.controller';
import { LevelsService } from './levels/levels.service';
import { OrdersModule } from './orders/orders.module';
import { OrdersService } from './orders/orders.service';
import { OrderDetailsModule } from './order-details/order-details.module';
import { CoursesModule } from './courses/courses.module';
import { CoursesService} from './courses/courses.service';

/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    TokensModule,
    QuestionsModule,
    ResultsModule,
    DescriptionsModule,
    ReportsModule,
    ConfigModule,
    ClientModule,
    LevelsModule,
    OrdersModule,
    OrderDetailsModule,
    CoursesModule,
  ],
  controllers: [
    AppController,
    QuestionsController,
    ResultsController,
    LevelsController,
    DescriptionsController,
    AttemptsController,
  ],
  providers: [
    AppService,
    AuthService,
    QuestionsService,
    ResultsService,
    LevelsService,
    DescriptionsService,
    OrdersService,
    CoursesService,
  ],
  exports: [
    AuthModule,
    UsersModule,
    TokensModule,
    ResultsModule,
    LevelsModule,
    DescriptionsModule,
    DescriptionsService,
    ConfigModule,
    OrdersService,
    CoursesService,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
