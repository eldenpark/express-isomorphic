import React from 'react';

export class Isomorphic {
  options: IsomorphicOptions = {
    ssr: false,
  };
  store: IsomorphicStore;

  constructor({
    ssr = false,
    store = {},
  } = {}) {
    this.options = {
      ssr,
    };
    this.store = store;
  }

  getStoreObject() {
    return JSON.stringify(this.store)
      .replace(/</g, '\\u003c');
  }
}

export const IsomorphicContext = React.createContext<Isomorphic | null>(null);

export const IsomorphicProvider: React.FC<IsomorphicProviderProps> = ({
  children,
  isomorphic,
}) => {
  return (
    <IsomorphicContext.Provider value={isomorphic}>
      {children}
    </IsomorphicContext.Provider>
  );
};

export const createIsomorphic = ({
  ssr = false,
  store = {},
}: CreateIsomorphicArgs = {}) => {
  return new Isomorphic({
    ssr,
    store,
  });
};

export interface IsomorphicStore {
  [cacheKey: string]: {
    data: null | any;
    error?: any;
  };
}

interface CreateIsomorphicArgs {
  ssr?: boolean;
  store?: object;
}

interface IsomorphicProviderProps {
  isomorphic: Isomorphic;
}

interface IsomorphicOptions {
  ssr: boolean;
}
