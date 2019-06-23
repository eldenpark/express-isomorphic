import React from 'react';

import UniversalContext from '../contexts/UniversalContext';

const TransferredState = () => {
  return (
    <div>
      <p>[Transferred State]</p>
      <UniversalContext.Consumer>
        {(value: any) => {
          console.log('[universal] predefinedState: %o', value); // eslint-disable-line

          return (
            <div>
              <span>predefinedState value</span>
              <span>{value.foo}</span>
            </div>
          );
        }}
      </UniversalContext.Consumer>
    </div>
  );
};

export default TransferredState;
