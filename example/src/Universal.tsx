import * as React from 'react';

const someValue = 10110;

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

export default Universal;
