import { logger } from 'jege';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '@@universal/components/Header';
import PageDefault from '@@universal/components/PageDefault';
import Page1 from '@@universal/components/PageOne';

const log = logger('[example-react-simple]');

import('./components/Later')
  .then(() => {
    log('Universal(): <Later /> is loaded');
  })
  .catch((err) => log('error loading <Later />: %o', err));

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
