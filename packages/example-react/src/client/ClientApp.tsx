import { hot } from 'react-hot-loader';
import { IsomorphicProvider } from 'express-isomorphic-react';
import * as React from 'react';

import Universal from '../universal/Universal';

const ClientApp = () => {
  return (
    <IsomorphicProvider store={{}}>
      <Universal />
    </IsomorphicProvider>
  );
};

export default hot(module)(ClientApp);
