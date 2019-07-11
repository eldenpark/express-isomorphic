import axios from 'axios';
import React from 'react';

import { useIsomorphicContext } from '@nodekit/express-isomorphic-react';
import useBattery from 'react-use/lib/useBattery';

const _fetcher = async (param) => {
  console.log('param', param);
  const { data } = await axios.get('http://httpbin.org');
  return data;
};

const useFetch = (fetcher, fetcherParam, options) => {
  const ssr = useIsomorphicContext();
  console.log(2, ssr);

  // const [result, setResult] = React.useState(undefined);
  // console.log(result);

  // React.useEffect(() => {
    // async function getData() {
    //   const data = await fetcher(fetcherParam);
    //   setResult(data);
    // }
    // getData();
  // }, []);

  return {
    result: 3,
  };
};

const Inner = () => {
  const param = {
    a: 1,
  };
  const { result } = useFetch(_fetcher, param, {
    key: 'http://httpbin.org/',
  });
  
  const battery = useBattery();
  console.log(1, battery);
  // console.log(22, result);

  return (
    <div>
      power
    </div>
  );
};

export default Inner;
