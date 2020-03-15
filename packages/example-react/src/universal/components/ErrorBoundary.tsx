/* eslint-disable react/prefer-stateless-function */
import React from 'react';

class ErrorBoundary extends React.Component {
  state = {
    errorMsg: undefined,
  };

  componentDidCatch(err) {
    console.log('error has occured: %s', err); // eslint-disable-line

    this.setState(() => ({
      errorMsg: err,
    }));
  }

  render() {
    const { errorMsg } = this.state;
    const { children } = this.props;

    return (
      <div>
        {children}
        {errorMsg !== undefined
          ? (
            <div>
              <p>
                error has occurred
              </p>
              <p>
                {errorMsg}
              </p>
            </div>
          )
          : null
        }
      </div>
    );
  }
}

export default ErrorBoundary;
