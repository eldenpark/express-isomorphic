import * as React from 'react';
import { renderToString } from 'react-dom/server';

import {
  addPath,
  attachAssets,
  MakeHtml,
  requireUniversalComponent,
} from '@nodekit/express-isomorphic2';
import { Locals } from './server';
import ServerApp from './ServerApp';

const makeHtml: MakeHtml = async function ({
  assets,
  requestUrl,
  resLocals,
  universalAppPath = '',
}) {
  const Universal = requireUniversalComponent(universalAppPath);
  const universalState = {
    foo: '1313',
  };

  // console.log('request headers: %o', resLocals.headers);

  const element = (
    <ServerApp
      renderUniversal={Universal}
      universalState={universalState}
    />
  );

  const appRootInString = renderToString(element);
  console.log('[make-html] assets: %s', assets);

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
