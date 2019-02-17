import * as React from 'react';

import Header from './Header';

class Universal extends React.Component {
  state = {
    value: 10221,
  };

  render() {
    return (
      <div>
        <Header />
        <p>universal</p>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

export default Universal;
