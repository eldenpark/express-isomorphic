import axios from 'axios';
import React from 'react';

import useFetch from './useFetch';

const _fetcher = async (param) => {
  console.log('param', param);
  const { data } = await axios.get('http://httpbin.org');
  return data;
};

const Inner = () => {
  const param = {
    a: 1,
  };
  const { result } = useFetch(_fetcher, param, {
    key: 'http://httpbin.org/',
  });
  console.log(1, result);

  // const battery = useBattery();
  // console.log(1, battery);
  // console.log(22, result);

  return (
    <div>
      Inner
    </div>
  );
};

export default Inner;
