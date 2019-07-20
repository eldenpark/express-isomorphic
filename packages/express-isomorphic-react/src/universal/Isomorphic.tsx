import React from 'react';

const isomorphicConstructorSecret = Symbol('isomorphicConstructorSecret');

export class Isomorphic {
  options: IsomorphicOptions = {
    ssr: false,
  };
  store: IsomorphicStore;

  constructor({
    constructorSecret,
    options,
    store,
  }) {
    if (constructorSecret !== isomorphicConstructorSecret) {
      console.warn('Isomorphic(): Try not to instantiate this using new keyword. Use createIsomorphic() instead'); // eslint-disable-line
    }

    this.options = options;
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
  const options = {
    ssr,
  };
  return new Isomorphic({
    constructorSecret: isomorphicConstructorSecret,
    options,
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
