import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { attachAssets } from '../../../lib';
import ServerApp from './ServerApp';

const makeHtml: MakeHtml = async function ({
  assets,
  requestUrl = '',
  universalAppPath = '',
}) {
  const Universal = requireUniversalComponent(universalAppPath);
  const predefinedState = {
    foo: '1313',
  };

  const element = (
    <ServerApp
      predefinedState={predefinedState}
      renderUniversal={Universal}
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
  <script>window['$state']=${JSON.stringify(predefinedState)}</script>
</head>
<body>
  <div id="app-root">${appRootInString}</div>
  ${attachAssets(assets)}
</body>
</html>
`;
};

export default makeHtml;

function requireUniversalComponent(universalAppPath) {
  let Universal = undefined;
  try {
    Universal = require(universalAppPath).default;
  } catch (err) {
    console.error('Error loading UniversalApp at path: %s\nOriginal Error: %o', universalAppPath, err);
    Universal = () => <div>RootContainer not found</div>;
  }
  return Universal;
}

interface MakeHtml {
  (arg: {
    assets: string[];
    requestUrl: string;
    universalAppPath: string;
  }): Promise<string>;
}
