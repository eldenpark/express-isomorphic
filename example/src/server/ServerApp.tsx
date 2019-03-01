import * as React from 'react';

const ServerApp = ({
  predefinedState,
  renderUniversal: Universal,
}) => {
  console.log('[server] predefinedState: %o', predefinedState);

  const { UniversalContext } = Universal.contexts;

  return (
    <UniversalContext.Provider value={predefinedState}>
      <Universal />
    </UniversalContext.Provider>
  );
};

export default ServerApp;
