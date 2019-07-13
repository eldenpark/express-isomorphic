import { useContext } from 'react';

import { IsomorphicContext } from './Isomorphic';

export default function useIsomorphicContext() {
  const isomorphic = useContext(IsomorphicContext);

  if (!isomorphic) {
    throw new Error('Isomorphic is not provided. Did you use <IsomorphicProvider />?');
  }

  return isomorphic;
}
