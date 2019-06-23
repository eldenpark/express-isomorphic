import {
  attachAssets,
  MakeHtml,
} from '@nodekit/express-isomorphic';
import React from 'react';
import { renderToString } from 'react-dom/server';

import ServerApp from './ServerApp';

const makeHtml: MakeHtml = async function makeHtml({
  assets,
  requestUrl,
}) {
  const time = new Date().toISOString();
  console.log( // eslint-disable-line
    `${time} [express-isomorphic-react] makeHtml(): assets: %s, requestUrl: %s`,
    assets,
    requestUrl,
  );

  const element = (
    <ServerApp />
  );

  const appRootInString = renderToString(element);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
  <title>express-isomorphic-example</title>
</head>
<body>
  <div id="app-root">${appRootInString}</div>
  ${attachAssets(assets)}
</body>
</html>
`;
};

export default makeHtml;
