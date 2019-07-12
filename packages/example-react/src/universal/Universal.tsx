import React from 'react';

import Header from './components/Header';
import Inner from './components/Inner';

import('./components/Later')
  .then(() => {
    console.log('[express-isomorphic-react] Later is loaded'); // eslint-disable-line
  })
  .catch((err) => console.error('error loading <Later />', err)); // eslint-disable-line

const Universal: React.FC<{}> = ({
  children,
}) => {
  return (
    <div>
      <Header />
      <div>
        <Inner />
      </div>
      {children}
    </div>
  );
};

export default Universal;
