import { argv } from 'yargs';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import express from 'express';
import { logger } from '@nodekit/logger';

import {
  MakeHtml,
  MakeHtmlPayload,
} from './createExpress';

const log = logger('[express-isomorphic]');

log('htmlGeneratingServer(): command line arguments: %j', argv);

(function htmlGeneratingServer() {
  const app = express();
  const port = argv.port || 10021;
  const makeHtmlPath = requireNonEmpty(argv.makeHtmlPath, 'makeHtmlPath should be provided');
  const makeHtml: MakeHtml<any> = require(makeHtmlPath).default || require(makeHtmlPath);

  app.use(bodyParser.json());

  app.post('/makeHtml', async (req, res) => {
    const {
      requestUrl,
      serverState,
    }: MakeHtmlPayload<any> = req.body;

    let html: string;
    try {
      html = (await makeHtml({
        requestUrl,
        serverState,
      })).toString();
    } catch (err) {
      log('htmlGeneratingServer(): error making html: %o', err);
      html = err.toString();
    }

    res.send(html);
  });

  app.listen(port, () => {
    log(`htmlGeneratingServer(): listening on port: ${chalk.yellow('%s')}`, port);
  });

  return app;
})();

function requireNonEmpty(obj, msg) {
  if (!obj || obj === '') {
    throw new Error(`requireNonEmpty(): ${msg}`);
  } else {
    return obj;
  }
}
