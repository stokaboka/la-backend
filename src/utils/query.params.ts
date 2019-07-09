/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { Like } from 'typeorm';

export class QueryParams {
  static prepare(
    params: any,
    whereProps: any[] = [],
    paramsWhere: any = {},
  ): any {
    const page = params === null ? 0 : params.page || 0;
    const limit = params === null ? 0 : params.limit || 0;
    const sortBy = params === null ? '' : params.sortBy || '';
    const descending = params === null ? 'false' : params.descending || 'false';
    const filter = params === null ? '' : params.filter || '';

    let where: any = { ...paramsWhere };
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
