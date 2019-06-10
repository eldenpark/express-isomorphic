import { argv } from 'yargs';
import bodyParser from 'body-parser';
import express from 'express';

import { log } from './utils/log';

log('htmlGeneratingServer(): command line arguments: %o', argv);

const app = express();
const port = argv.port || 10021;
const makeHtmlPath = requireNonEmpty(argv.makeHtmlPath, 'makeHtmlPath should be provided');
const makeHtml = require(makeHtmlPath).default || require(makeHtmlPath);

app.use(bodyParser.json());

app.post('/makeHtml', async (req, res, next) => {
  const { assets } = req.body;
  const html = await makeHtml({
    assets,
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
