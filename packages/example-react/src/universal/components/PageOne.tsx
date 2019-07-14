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

const fetchFunction2 = async () => {
  const { data } = await axios.get('http://httpbin.org/get');
  return data.origin;
};

const fetchOptions = {
  cacheKey: 'http://httpbin.org/',
  fetcherParam: {
    power: 1,
  },
};

const PageOne: React.FC<any> = () => {
  const result = useFetch(fetchFunction, fetchOptions);
  const [latestResult, setLatestResult] = React.useState(null);

  const handleClickFetch = React.useCallback(() => {
    fetchFunction2()
      .then((data) => {
        setLatestResult(data);
      });
  }, []);

  const text = (latestResult || result.data) || '';

  return (
    <div>
      Page One
      <button
        onClick={handleClickFetch}
        type="button"
      >
        fetch
      </button>
      <div>
        {text.length}
      </div>
    </div>
  );
};

export default PageOne;
