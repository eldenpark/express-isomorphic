import { hot } from 'react-hot-loader';
import * as React from 'react';

import Universal from '../universal/Universal';

const ClientApp = ({
  universalState,
}) => {
  const { UniversalContext } = Universal.contexts;

  return (
    <UniversalContext.Provider value={universalState}>
      <Universal />
    </UniversalContext.Provider>
  );
};

export default hot(module)(ClientApp);
