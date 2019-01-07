import { hot } from 'react-hot-loader';
import * as React from 'react';

const someValue = 1022;

class Universal extends React.Component {
  render() {
    return (
      <div>
        <p>universal</p>
        <p>{someValue}</p>
      </div>
    );
  }
}

export default hot(module)(Universal);
