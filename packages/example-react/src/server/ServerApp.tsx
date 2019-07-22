import { StaticRouter } from 'react-router-dom';
import React from 'react';

import Universal from '../universal/Universal';

const ServerApp: React.FC<ServerAppProps> = ({
  requestUrl,
}) => {
  return (
    <StaticRouter location={requestUrl}>
      <Universal />
    </StaticRouter>
  );
};

export default ServerApp;

interface ServerAppProps {
  requestUrl: string;
}
