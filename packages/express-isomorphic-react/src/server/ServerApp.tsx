import * as React from 'react';

import { addPath } from '@nodekit/express-isomorphic2';

const ServerApp = ({
  renderUniversal: Universal,
  universalState,
}) => {
  const { UniversalContext } = Universal.contexts;

  return (
    <UniversalContext.Provider value={universalState}>
      {/* <C /> */}
      <Universal
        addPath={addPath}
      />
    </UniversalContext.Provider>
  );
};

export default ServerApp;


const C: React.FC = ({
  children,
}) => {
  const [ count, setCount ] = React.useState(0);

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
      <div>
        <p>[count]</p>
        <p>{count}</p>
        {/* <button onClick={handleClickButton}>add</button> */}
      </div>
      {children}
    </div>
  );
};