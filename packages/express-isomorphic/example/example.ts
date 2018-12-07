import http from 'http';

import ExpressIsomorphic from '../lib';
import * as paths from './paths';
import makeHtml from './src/makeHtml';

const { localServer, productionServer, eject } = ExpressIsomorphic.create({
  bundlePath: paths.distPublicBundle,
  ejectPath: paths.ejectPath,
  makeHtml,
  publicPath: paths.dist,
  serverDistPath: paths.dist,
  universalAppPath: paths.universalApp,
  webpackConfigClientLocalPath: paths.webpackConfigClientLocalWeb,
  webpackConfigUniversalLocalPath: paths.webpackConfigUniversalLocal,
});

const port = 5234

// const httpServer = http.createServer(localServer().app);
// httpServer.listen(port, () => {
//   console.log(`Listening on ${port}`);
// });

eject();
