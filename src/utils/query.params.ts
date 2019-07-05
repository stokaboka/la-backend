/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Like } from 'typeorm';

export class QueryParams {
  static prepare(params: any, whereProps: any[] = []): any {
    const { page, limit, sortBy, descending, filter } = params;

    let where: any[] = [];
    if (filter) {
      where = whereProps.map(e => {
        const out = {};
        out[e] = Like(`%${filter}%`);
        return out;
      });
    }

    const order: any = {};

    if (sortBy) {
      order[sortBy] = descending === 'true' ? 'DESC' : 'ASC';
    }

    const take = limit || 0;
    const skip = ((page || 1) - 1) * (limit || 0);

    return { where, order, take, skip };
  }
}