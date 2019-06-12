import { Request, NextFunction } from 'express';
import { Extend } from '@nodekit/express-isomorphic2';

const extend: Extend = (app, serverState) => {
  app.use((req: Request, res, next: NextFunction) => {
    const time = new Date().toISOString();
    console.log(`${time} [express-isomorphic-react] extend(): requestUrl: ${req.url}`);
    next();
  });
};

export default extend;
