import ExpressIsomorphic from '@nodekit/express-isomorphic2';
import http from 'http';
import path from 'path';

import extend from './extend';
import webpackConfig from '../webpack/webpack.config.client.local.web';

const { localServer } = ExpressIsomorphic.create({
  extend,
  makeHtmlPath: path.resolve(__dirname, './makeHtmlLaunch.js'),
  webpackBuild: {},
  webpackConfig,
});

const port = 6001;

const httpServer = http.createServer(localServer().app);

httpServer.listen(port, () => {
  const time = new Date().toISOString();
  console.log(`${time} [express-isomorphic-react] LocalServer listening on ${port}`);
});
