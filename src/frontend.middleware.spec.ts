import { FrontendMiddleware } from './frontend.middleware';

describe('FrontendMiddleware', () => {
  it('should be defined', () => {
    // @ts-ignore
    expect(new FrontendMiddleware()).toBeDefined();
  });
});
