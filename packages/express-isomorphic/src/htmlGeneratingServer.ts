import { argv } from 'yargs';
import bodyParser from 'body-parser';
import express from 'express';

import { MakeHtml } from './createExpress';
import { log } from './utils/log';

log('htmlGeneratingServer(): command line arguments: %j', argv);

const app = express();
const port = argv.port || 10021;
const makeHtmlPath = requireNonEmpty(argv.makeHtmlPath, 'makeHtmlPath should be provided');
const makeHtml: MakeHtml = require(makeHtmlPath).default || require(makeHtmlPath);

app.use(bodyParser.json());

app.post('/makeHtml', async (req, res, next) => {
  const {
    assets,
    requestUrl,
  } = req.body;

  const html = await makeHtml({
    assets,
    requestUrl,
    state: {},
  });

  res.send(html);
});

app.listen(port, () => {
  log('htmlGeneratingServer(): listening on port: %s', port);
});

function requireNonEmpty(obj, msg) {
  if (!obj|| obj === '') {
    throw new Error(`requireNonEmpty(): ${msg}`);
  } else {
    return obj;
  }
}
