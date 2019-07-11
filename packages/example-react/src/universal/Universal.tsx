import React from 'react';

import Header from './components/Header';
import Inner from './components/Inner';
import TransferredState from './components/TransferredState';
import UniversalContext from './contexts/UniversalContext';

if (typeof window === 'undefined' && global['window'] === undefined) {
  global['window'] = {};
}

import('./components/Later')
  .then(() => {
    console.log('[express-isomorphic-react] Later is loaded'); // eslint-disable-line
  })
  .catch((err) => console.error('error loading <Later />', err)); // eslint-disable-line

const Universal: UniversalType = ({
  children,
}) => {
  // const [ count, setCount ] = React.useState(0);

  // const handleClickButton = useMemo(
  //   () => {
  //     return () => {
  //       setCount(count + 1);
  //     };
  //   },
  //   [count],
  // );

  return (
    <div>
      <Header />
      <div>
        <Inner />
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
