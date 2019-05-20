/*
 * Copyright (c) 2018.  Igor Khorev, Orangem.me, igorhorev@gmail.com
 */

import { createParamDecorator } from '@nestjs/common';

export const Header = createParamDecorator((header: string, req) => {
  const value = req.headers[header] ? req.headers[header].trim() : null;
  return value;
});
