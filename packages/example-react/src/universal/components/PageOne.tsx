import axios from 'axios';
import React from 'react';

const fetchFunction2 = async () => {
  const { data } = await axios.get('http://httpbin.org/get');
  return data.origin;
};

const PageOne: React.FC<any> = () => {
  const [result, setResult] = React.useState('');

  const handleClickFetch = React.useCallback(() => {
    fetchFunction2()
      .then((data) => {
        setResult(data);
      });
  }, []);

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
        {result.length}
      </div>
    </div>
  );
};

export default PageOne;
