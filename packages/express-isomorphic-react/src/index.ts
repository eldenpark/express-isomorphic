import React from 'react';

if (typeof window === 'undefined' && global['window'] === undefined) {
  global['window'] = {};
}
window['React2'] = React;

export const IsomorphicContext = React.createContext(null);

export function useIsomorphicContext() {
  const isomorphicContext = React.useContext(IsomorphicContext);

  if (!isomorphicContext) {
    throw new Error('isomorphic context is not provided');
  }

  return isomorphicContext;
}
