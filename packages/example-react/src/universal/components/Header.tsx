import React from 'react';
import {
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

const Title = ({
  pathname,
}) => {
  return (
    <div>{pathname}</div>
  );
};

const Header: React.FC<RouteComponentProps> = ({
  history,
  location,
}) => {
  const { pathname } = location;

  const handleClickButton = React.useCallback((route) => () => {
    history.push(route);
  }, []);

  return (
    <div
      style={{
        marginBottom: 100,
      }}
    >
      <Title pathname={pathname} />
      <button
        onClick={handleClickButton('/')}
        type="button"
      >
        Root
      </button>
      <button
        onClick={handleClickButton('/pageOne')}
        type="button"
      >
        Page one
      </button>
      <button
        onClick={handleClickButton('/pageError')}
        type="button"
      >
        Page error
      </button>
    </div>
  );
};

export default withRouter(Header);
