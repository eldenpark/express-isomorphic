import {
  Isomorphic,
  IsomorphicProvider,
} from 'express-isomorphic-react';
import { StaticRouter } from 'react-router-dom';
import React from 'react';

import Universal from '../universal/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  isomorphic,
  requestUrl,
}) => {
  return (
    <StaticRouter location={requestUrl}>
      <IsomorphicProvider isomorphic={isomorphic}>
        <Universal />
      </IsomorphicProvider>
    </StaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  isomorphic: Isomorphic;
  requestUrl: string;
}
