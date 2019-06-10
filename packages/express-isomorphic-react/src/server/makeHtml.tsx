import * as React from 'react';
import { renderToString } from 'react-dom/server';

import {
  addPath,
  attachAssets,
  MakeHtml,
} from '@nodekit/express-isomorphic2';
import { Locals } from './server';
import ServerApp from './ServerApp';

const makeHtml: MakeHtml = async function ({
  assets,
  requestUrl,
}) {
  console.log('[express-isomorphic-react] makeHtml(): assets: %s, url: %s', assets, requestUrl);

  const universalState = {
    foo: '13131',
  };

  const element = (
    <ServerApp
      universalState={universalState}
    />
  );

  const appRootInString = renderToString(element);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
  <title>express-isomorphic-example</title>
  <script>window['universalState']=${JSON.stringify(universalState)}</script>
</head>
<body>
  <div id="app-root">${appRootInString}</div>
  ${attachAssets(assets)}
</body>
</html>
`;
};

export default makeHtml;
