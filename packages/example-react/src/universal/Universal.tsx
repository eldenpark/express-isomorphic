import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '@@universal/components/Header';
import PageDefault from '@@universal/components/PageDefault';
import Page1 from '@@universal/components/PageOne';

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
            component={Page1}
            path="/page1"
          />
          <Route
            component={PageDefault}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Universal;
