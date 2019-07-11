import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import Universal from '../universal/Universal';

const ClientApp = () => {
  return (
    <Universal />
  );
};

export default hot(ClientApp);
