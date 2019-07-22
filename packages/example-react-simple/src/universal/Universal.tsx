import { logger } from 'jege';
import React from 'react';

import Header from './components/Header';
import TransferredState from './components/TransferredState';
import UniversalContext from './contexts/UniversalContext';

const log = logger('[example-react-simple]');

import('./components/Later')
  .then(() => {
    log('Universal(): <Later /> is loaded');
  })
  .catch((err) => log('error loading <Later />: %o', err));

const Universal: UniversalType = ({
  children,
}) => {
  return (
    <div>
      <Header />
      <div>
        <p>[count]</p>
        {/* <p>{count}</p> */}
        {/* <button onClick={handleClickButton}>add</button> */}
      </div>
      <TransferredState />
      {children}
    </div>
  );
};

export default Universal;

Universal.contexts = {
  UniversalContext,
};

type UniversalType = React.FC<UniversalProps> & { contexts };

interface UniversalProps {
  addPath?: Function;
  children?: React.ReactNode;
}
