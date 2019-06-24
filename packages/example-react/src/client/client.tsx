/* eslint-disable no-console */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ClientApp from './ClientApp';

declare global {
  interface Window {
    _babelPolyfill: any;
  }
  namespace NodeJS {
    interface Global {
      _babelPolyfill: any;
    }
  }
}

(function setBabelPolyfill() {
  if ((typeof window !== 'undefined' && !window._babelPolyfill)
    || (typeof global !== 'undefined' && !global._babelPolyfill)) {
    console.info(`[client] babel-polyfill is imported, since it wasn't imported yet`);
    require('babel-polyfill');
  }
})();

console.info('[client] Running in NODE_ENV: %s', process.env.NODE_ENV);

const appRoot = document.getElementById('app-root');

ReactDOM.hydrate(
  <ClientApp />,
  appRoot,
);
