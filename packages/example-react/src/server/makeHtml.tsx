import {
  createAssetElements,
  createSocketScriptElement,
  stringifyServerState,
} from 'express-isomorphic/utils';
import {
  MakeHtml,
} from 'express-isomorphic';
import { logger } from 'jege/server';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';

import ServerApp from './ServerApp';
import State from './IsomorphicState';

const log = logger('[example-react]');

const makeHtml: MakeHtml<State> = async function makeHtml({
  requestUrl,
  serverState,
}) {
  log(
    'makeHtml(): requestUrl: %s, serverState: %s',
    requestUrl,
    stringifyServerState(serverState),
  );

  const { socketPath, socketPort, state } = serverState;
  const styledComponentsStyleSheet = new ServerStyleSheet();

  let element = (
    <ServerApp
      requestUrl={requestUrl}
    />
  );
  element = styledComponentsStyleSheet.collectStyles(element);

  const appRootInString = renderToString(element);

  log('makeHtml(): appRootInString length: %s', appRootInString.length);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1">
  <title>express-isomorphic-example</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.dev.js"></script>
  ${styledComponentsStyleSheet.getStyleTags()}
</head>
<body>
  <div id="app-root">${appRootInString}</div>
  ${createAssetElements(state.assets, state.publicPath)}
  <script>
    ${createSocketScriptElement(socketPort, socketPath)}
  </script>
</body>
</html>
`;
};

export default makeHtml;
