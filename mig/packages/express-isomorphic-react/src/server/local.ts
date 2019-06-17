import { Request, NextFunction } from 'express';
import ExpressIsomorphic, {
  Extend,
} from '@nodekit/express-isomorphic2';
import http from 'http';
import path from 'path';

import webpackConfig from '../webpack/webpack.config.client.local.web';

const extend: Extend = (app, serverState) => {
  app.use((req: Request, res, next: NextFunction) => {
    const time = new Date().toISOString();
    console.log(`${time} [express-isomorphic-react] extend(): requestUrl: ${req.url}`);

    next();
  });
};

const { app } = ExpressIsomorphic.local({
  extend,
  makeHtmlPath: path.resolve(__dirname, './makeHtmlLaunch.js'),
  webpackConfig,
});

const port = 6001;

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  const time = new Date().toISOString();
  console.log(`${time} [express-isomorphic-react] LocalServer listening on ${port}`);
});
