import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsModule } from './questions/questions.module';
import { DescriptionsModule } from './descriptions/descriptions.module';
import { DescriptionsController } from './descriptions/descriptions.controller';
import { ResultsController } from './results/results.controller';
import { AttemptsController } from './attempts/attempts.controller';
import { ResultsModule } from './results/results.module';
import { ReportsModule } from './reports/reports.module';
import { ConfigModule } from './config/config.module';
import { ClientModule } from './client/client.module';
import { LevelsModule } from './levels/levels.module';
import { LevelsController } from './levels/levels.controller';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { CoursesModule } from './courses/courses.module';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { FrontendMiddleware } from './frontend.middleware';
import { ConfigService } from './config/config.service';

/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'svoboda-lingvo',
      signOptions: { expiresIn: '24h' },
    }),

    // TypeOrmModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
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
  ],
  exports: [
    JwtModule,
    AuthModule,
    UsersModule,
    TokensModule,
    ResultsModule,
    LevelsModule,
    DescriptionsModule,
    ConfigModule,
  ],
})
export class AppModule implements NestModule {

  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer
      .apply(FrontendMiddleware)
      .forRoutes({
        path: '/**',
        method: RequestMethod.ALL,
      });
  }
}
