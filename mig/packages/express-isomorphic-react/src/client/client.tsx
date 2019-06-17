import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ClientApp from './ClientApp';

(function setBabelPolyfill() {
  if ((typeof window !== 'undefined' && !window['_babelPolyfill'])
    || (typeof global !== 'undefined' && !global['_babelPolyfill'])) {
    console.info(`[client] babel-polyfill is imported, since it wasn't imported yet`);
    require('babel-polyfill');
  }
})();

console.info('[client] Running in NODE_ENV: %s', process.env.NODE_ENV);

const appRoot = document.getElementById('app-root');

const universalState = window['universalState'];

ReactDOM.hydrate(
  <ClientApp
    universalState={universalState}
  />,
  appRoot,
);
