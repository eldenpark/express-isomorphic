import { argv } from 'yargs';
import bodyParser from 'body-parser';
import express from 'express';
import { logger } from '@nodekit/logger';

import {
  MakeHtml,
  MakeHtmlPayload,
} from './createExpress';

const log = logger('[express-isomorphic]');

log('htmlGeneratingServer(): command line arguments: %j', argv);

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

  const html = await makeHtml({
    requestUrl,
    serverState,
  });

  res.send(html.toString());
});

app.listen(port, () => {
  log('htmlGeneratingServer(): listening on port: %s', port);
});

function requireNonEmpty(obj, msg) {
  if (!obj || obj === '') {
    throw new Error(`requireNonEmpty(): ${msg}`);
  } else {
    return obj;
  }
}
