import React, { isValidElement } from 'react';

export const IsomorphicContext = React.createContext(null);

export function useIsomorphicContext() {
  const isomorphicContext = React.useContext(IsomorphicContext);

  if (!isomorphicContext) {
    throw new Error('isomorphic context is not provided');
  }

  return isomorphicContext;
}

export function IsomorphicProvider({
  children,
  store,
}) {
  return <IsomorphicContext.Provider value={store}>{children}</IsomorphicContext.Provider>;
}
