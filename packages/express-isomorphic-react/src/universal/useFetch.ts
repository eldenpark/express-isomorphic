import React from 'react';

import Fetcher, {
  FetchFunction,
  FetchOptions,
} from '../internals/Fetcher';
import { SSRManagerContext } from '../internals/SSRManager';
import useIsomorphicContext from './useIsomorphicContext';

async function doFetch(fetchFunction, fetchParam, setResult) {
  setResult({
    loading: true,
  });

  try {
    const data = await fetchFunction(fetchParam);
    setResult({
      data,
      loading: false,
    });
  } catch (err) {
    setResult({
      error: err,
      loading: false,
    });
  }
}

const useFetch = (fetchFunction: FetchFunction, fetchOptions: FetchOptions) => {
  const {
    options,
    store,
  } = useIsomorphicContext();
  const ssrManager = React.useContext(SSRManagerContext);
  const { cacheKey, fetchParam } = fetchOptions;
  const isInCache = cacheKey && store[cacheKey];
  const { ssr } = options;
  const ssrInUse = ssr && ssrManager;

  const prefetchedResult = store[cacheKey] || {};
  const [result, setResult] = React.useState<any>(prefetchedResult);

  React.useEffect(() => {
    if (!isInCache) {
      doFetch(fetchFunction, fetchParam, setResult);
    }

    return () => {
      if (isInCache) {
        delete store[cacheKey!];
      }
    };
  }, []);

  if (ssrInUse) {
    if (isInCache) {
      const fetcher = new Fetcher(fetchFunction, fetchOptions, store);
      ssrManager!.register(fetcher);
    }
  }

  return {
    data: result.data,
    error: result.error,
    loading: result.loading || false,
  };
};

export default useFetch;
