import { BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import * as React from 'react';

import Universal from '../universal/Universal';

const ClientApp = () => {
  return (
    <BrowserRouter>
      <Universal />
    </BrowserRouter>
  );
};

export default hot(module)(ClientApp);
