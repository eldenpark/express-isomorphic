import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { IsomorphicProvider } from 'express-isomorphic-react';
import * as React from 'react';

import Universal from '../universal/Universal';

const ClientApp = () => {
  return (
    <BrowserRouter>
      <IsomorphicProvider store={{}}>
        <Universal />
      </IsomorphicProvider>
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);
