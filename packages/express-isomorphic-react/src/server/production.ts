import ExpressIsomorphic from '@nodekit/express-isomorphic2';
import http from 'http';
import path from 'path';

import extend from './extend';
import webpackConfig from '../webpack/webpack.config.client.prod.web';

const webpackBuild = require('../../dist/build.json');

const { app } = ExpressIsomorphic.production({
  extend,
  makeHtmlPath: path.resolve(__dirname, './makeHtml.js'),
  webpackBuild,
  webpackConfig,
});

const port = 6001;

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  const time = new Date().toISOString();
  console.log(`${time} [express-isomorphic-react] ProductionServer listening on ${port}`);
});
