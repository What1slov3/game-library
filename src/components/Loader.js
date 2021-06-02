import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border: 4px solid transparent;
  border-top: 4px solid var(--text-gray);
  animation: ${rotate} 1s infinite;
`;

const Loader = ({}) => {
  return <StyledWrapper />;
};

export default Loader;
