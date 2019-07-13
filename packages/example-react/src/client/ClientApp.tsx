import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import {
  Isomorphic,
  IsomorphicProvider,
} from 'express-isomorphic-react';
import * as React from 'react';

import Universal from '../universal/Universal';

const isomorphic = new Isomorphic({
  store: window['__APP_STATE__'],
});

const ClientApp = () => {
  return (
    <BrowserRouter>
      <IsomorphicProvider isomorphic={isomorphic}>
        <Universal />
      </IsomorphicProvider>
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);
