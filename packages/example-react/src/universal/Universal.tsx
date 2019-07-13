import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '@@universal/components/Header';
import Inner from './components/Inner';

import('./components/Later')
  .then(() => {
    console.log('[express-isomorphic-react] Later is loaded'); // eslint-disable-line
  })
  .catch((err) => console.error('error loading <Later />', err)); // eslint-disable-line

const Universal: React.FC<{}> = () => {
  return (
    <div>
      <Header />
      <div className="page">
        <Switch>
          <Route
            component={() => 'd'}
            path="/page1"
          />
          <Route
            component={Inner}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Universal;
