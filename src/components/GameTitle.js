import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  font-weight: 700;
  font-size: 40px;

  @media (max-width: 500px) {
    font-size: 20px;
  }
`

const GameTitle = ({children}) => {
  return <StyledWrapper>{children}</StyledWrapper>
}

export default GameTitle;