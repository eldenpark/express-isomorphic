import {
  NextFunction,
  Request,
  Response,
} from 'express';
import http from 'http';

import ExpressIsomorphic from '../../../lib';
import * as paths from '../../paths';
import makeHtml from './makeHtml';

function extend(app, state) {
  console.log('extend()');

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('middleware: extend');
    next();
  });
}

const { localServer, server, eject } = ExpressIsomorphic.create({
  bundlePath: paths.distPublicBundle,
  ejectPath: paths.ejectPath,
  extend,
  makeHtml,
  publicPath: paths.dist,
  serverDistPath: paths.dist,
  universalAppPath: paths.universalApp,
  webpackConfigClientLocalPath: paths.webpackConfigClientLocalWeb,
  webpackConfigUniversalLocalPath: paths.webpackConfigUniversalLocal,
});

const port = 5234

const httpServer = http.createServer(localServer().app);
httpServer.listen(port, () => {
  console.log(`Listening on ${port}`);
});

// eject();
