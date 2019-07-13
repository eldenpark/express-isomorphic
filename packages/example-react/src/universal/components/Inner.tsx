import axios from 'axios';
import React from 'react';

import { useFetch } from 'express-isomorphic-react';

const fetchFunction = async (param = {}) => {
  console.log('fetchFunction(): executing with fetchParam: %j', param);
  const { data } = await axios.get('http://httpbin.org');
  return data;
};

const fetchOptions = {
  cacheKey: 'http://httpbin.org/',
  fetcherParam: {
    power: 1,
  },
};

const Inner = () => {
  const result = useFetch(fetchFunction, fetchOptions);
  console.log('inner', result);

  return (
    <div>
      Inner
    </div>
  );
};

export default Inner;
