import { IsomorphicProvider } from 'express-isomorphic-react';
import { StaticRouter } from 'react-router-dom';
import * as React from 'react';

import Universal from '../universal/Universal';

const ServerApp = () => {
  return (
    <StaticRouter>
      <IsomorphicProvider store={{}}>
        <Universal />
      </IsomorphicProvider>
    </StaticRouter>
  );
};

export default ServerApp;
