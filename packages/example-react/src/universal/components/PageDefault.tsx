import axios from 'axios';
import { logger } from 'jege';
import React from 'react';

import { useFetch } from 'express-isomorphic-react';

const log = logger('[example-react]');

const fetchFunction = async (param = {}) => {
  log('fetchFunction(): executing with fetchParam: %j', param);
  const { data } = await axios.get('http://httpbin.org');
  return data;
};

const fetchOptions = {
  cacheKey: 'http://httpbin.org/',
  fetcherParam: {
    power: 1,
  },
};

const PageDefault = () => {
  const result = useFetch(fetchFunction, fetchOptions);
  log('PageDefault(): ', result);

  return (
    <div>
      Page Default
    </div>
  );
};

export default PageDefault;
