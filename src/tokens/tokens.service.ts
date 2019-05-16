/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tokens } from './tokens.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Tokens)
    private readonly repository: Repository<Tokens>,
  ) {}

  async clearTokenByUserId(idUser: number): Promise<any> {
    await this.repository.delete( { idUser } );
    return null;
  }

  async saveTokenByUserId(idUser: number, token: string): Promise<Tokens[]> {
    const userToken: any = await this.repository.save( { idUser, token  });
    return userToken;
  }

  async findTokenByUserId(idUser: number): Promise<Tokens[]> {
    return await this.repository.find({
      select: ['token'],
      where: { idUser },
    });
  }
}
