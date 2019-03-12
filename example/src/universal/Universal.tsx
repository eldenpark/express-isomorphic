import React, { useState, useMemo } from 'react';

import Header from './components/Header';
import TransferredState from './components/TransferredState';
import UniversalContext from './contexts/UniversalContext';

const Universal: UniversalType = ({
  addPath,
  children,
}) => {
  const [ count, setCount ] = React.useState(0);

  const handleClickButton = useMemo(
    () => {
      return () => {
        setCount(count + 1);
      };
    },
    [count],
  );

  return (
    <div>
      <Header />
      <div>
        <p>[count]</p>
        <p>{count}</p>
        <button onClick={handleClickButton}>add</button>
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
