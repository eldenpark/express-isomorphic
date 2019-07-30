import { logger } from 'jege';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import Header from '@@universal/components/Header';
import PageDefault from '@@universal/components/PageDefault';
import PageError from '@@universal/components/PageError';
import PageOne from '@@universal/components/PageOne';

const log = logger('[example-react-simple]');

const Page = styled.div({
  display: 'flex',
  justifyContent: 'center',
});

import('./components/Later')
  .then(() => {
    log('Universal(): <Later /> is loaded');
  })
  .catch((err) => log('error loading <Later />: %o', err));

const Universal: React.FC<{}> = () => {
  return (
    <div>
      <Header />
      <Page className="page">
        <Switch>
          <Route
            component={PageOne}
            path="/pageOne"
          />
          <Route
            component={PageError}
            path="/pageError"
          />
          <Route
            component={PageDefault}
          />
        </Switch>
      </Page>
    </div>
  );
};

export default Universal;
