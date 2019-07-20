import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import {
  createIsomorphic,
  IsomorphicProvider,
} from 'express-isomorphic-react';
import * as React from 'react';

import Universal from '../universal/Universal';

const isomorphic = createIsomorphic({
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
