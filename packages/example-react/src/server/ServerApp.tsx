import {
  Isomorphic,
  IsomorphicProvider,
} from 'express-isomorphic-react';
import { StaticRouter } from 'react-router-dom';
import * as React from 'react';

import Universal from '../universal/Universal';

const ServerApp = ({
  isomorphic,
}) => {
  return (
    <StaticRouter>
      <IsomorphicProvider isomorphic={isomorphic}>
        <Universal />
      </IsomorphicProvider>
    </StaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  isomorphic: Isomorphic;
}
