import {
  MakeHtml,
} from '@nodekit/express-isomorphic';
import { logger } from '@nodekit/logger';
import React from 'react';
import { renderToString } from 'react-dom/server';

import ServerApp from './ServerApp';
import State from './State';

const log = logger('[express-isomorphic-react]');

const makeHtml: MakeHtml<State> = async function makeHtml({
  requestUrl,
  serverState,
}) {
  log('makeHtml(): requestUrl: %s, serverState: %j', requestUrl, serverState);

  const { socketPort, state } = serverState;
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
</head>
<body>
  <div id="app-root">${appRootInString}</div>
  ${attachAssets(state.assets)}
  <script>
    if (window.io) {
      var socket = io.connect('http://localhost:${socketPort}');
      socket.on('express-isomorphic', function ({ msg }) {
        console.log('[express-isomorphic] %s', msg);
      });
    }
  </script>
</body>
</html>
`;
};

export default makeHtml;

function attachAssets(assets: string[] = []): string {
  return assets.map((asset) => {
    if (asset.endsWith('.js')) {
      return `<script src="/bundle/${asset}"></script>`;
    }

    if (asset.endsWith('.css')) {
      return `<link rel="stylesheet" type="text/css" href="/bundle/${asset}">`;
    }

    console.warn('The type of asset is not handled: %s', asset); // eslint-disable-line
    return undefined;
  })
    .join('');
}
