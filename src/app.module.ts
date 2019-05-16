import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TokensModule } from './tokens/tokens.module';
/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */


@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, TokensModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
  exports: [AuthModule, UsersModule, TokensModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
