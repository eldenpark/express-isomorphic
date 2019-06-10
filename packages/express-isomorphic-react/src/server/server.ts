import http from 'http';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import path from 'path';

import ExpressIsomorphic, {
  Extend,
} from '@nodekit/express-isomorphic2';
import makeHtml from './makeHtml';
import * as paths from '../paths';

import webpackConfig from '../webpack/webpack.config.client.local.web';

const extend: Extend = (app, state) => {
  app.use((req: Request, res, next: NextFunction) => {
    // console.log('middleware: extend()', req.headers);

    res.locals.headers = req.headers;
    next();
  });
};

const { localServer, server, eject } = ExpressIsomorphic.create({
  extend,
  makeHtml,
  makeHtmlPath: path.resolve(__dirname, './makeHtmlLaunch.js'),
  publicPath: paths.dist,
  serverDistPath: paths.dist,
  universalAppPath: path.resolve(paths.distUniversal, 'universal.rootContainer.js'),
  webpackBuildJsonPath: path.resolve(paths.distPublicBundle, 'build.json'),
  webpackConfig,
  webpackConfigClientLocalPath: paths.webpackConfigClientLocalWeb,
  webpackConfigUniversalLocalPath: paths.webpackConfigUniversalLocal,
});

const port = 6001;

const httpServer = http.createServer(localServer().app);
// const httpServer = http.createServer(server().app);

httpServer.listen(port, () => {
  console.log(`[express-isomorphic-react] Listening on ${port}`);
});

export interface Locals {
  headers: object;
}
