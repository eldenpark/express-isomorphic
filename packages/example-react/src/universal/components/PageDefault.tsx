import React from 'react';
import styled from 'styled-components';

const styles = require('./PageDefault.css');

const StyledPageDefault = styled.div({
  '>p': {
    backgroundColor: 'yellow',
  },
});

const P = styled.p({
  '&': {
    backgroundColor: 'yellow',
  },
});

const PageDefault = () => {
  return (
    <StyledPageDefault>
      <P className={styles.foo}>
        Page Default
      </P>
    </StyledPageDefault>
  );
};

export default PageDefault;
