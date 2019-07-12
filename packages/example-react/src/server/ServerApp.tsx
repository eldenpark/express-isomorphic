import * as React from 'react';
import { IsomorphicProvider } from 'express-isomorphic-react';

import Universal from '../universal/Universal';

const ServerApp = () => {
  return (
    <IsomorphicProvider store={{}}>
      <Universal />
    </IsomorphicProvider>
  );
};

export default ServerApp;
