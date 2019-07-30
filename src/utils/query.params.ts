/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Like } from 'typeorm';

export class QueryParams {
  static prepare(
    query: any,
    filterFields: any[] = [],
    params: any = {},
  ): any {
    const page = query === null ? 0 : query.page || 0;
    const limit = query === null ? 0 : query.limit || 0;
    const sortBy = query === null ? '' : query.sortBy || '';
    const descending = query === null ? 'false' : query.descending || 'false';
    const filter = query === null ? '' : query.filter || '';

    let where: any = {};
    if (filter) {
      where = filterFields.map(e => {
        const out = {...params};
        out[e] = Like(`%${filter}%`);
        return out;
      });
    } else {
      where = { ...params };
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
