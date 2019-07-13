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

/**
 * Feature still in construction
 */
const useFetch = (fetchFunction: FetchFunction, fetchOptions: FetchOptions, callback?) => {
  const {
    options,
    store,
  } = useIsomorphicContext();
  const ssrManager = React.useContext(SSRManagerContext);
  const [result, setResult] = React.useState<any>({});
  const { ssr } = options;
  const { cacheKey, fetchParam } = fetchOptions;

  console.log('useFetch(): callback, %s', callback);

  const ssrInUse = ssr && ssrManager;
  console.log('useFetch(): store keys: %j', Object.keys(store));

  React.useEffect(() => {
    const isInCache = cacheKey && store[cacheKey];
    console.log('useFetch(): useEffect, isInCache: %s', !!isInCache);

    if (!isInCache) {
      console.log('useFetch(): fetch start');
      doFetch(fetchFunction, fetchParam, setResult);
    }

    return () => {
      console.log('useFetch(): effect unload');
      if (isInCache) {
        delete store[cacheKey!];
      }
    };
  }, []);

  // const [result, setResult] = React.useState(undefined);
  // console.log(result);

  // React.useEffect(() => {
  // async function getData() {
  //   const data = await fetcher(fetcherParam);
  //   setResult(data);
  // }
  // getData();
  // }, []);

  if (ssrInUse) {
    if (!store[cacheKey]) {
      console.log('useFetch(): ssrInUse, try register');
      const fetcher = new Fetcher(fetchFunction, fetchOptions, store);
      ssrManager!.register(fetcher);
    }
  }

  return {
    data: result.data,
    error: result.error,
    loading: result.loading,
  };
};

export default useFetch;
