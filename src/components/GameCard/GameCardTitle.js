import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 22px;
  overflow-wrap: break-word;
  cursor: pointer;
`;

const StyledTip = styled.span`
  height: 0;
  overflow: hidden;
  display: block;
  font-size: 12px;
  font-weight: 400;
  color: var(--text-gray);
  transition: 0.2s;
`;

const GameCardTitle = ({ children, slug }) => {
  const history = useHistory();

  return (
    <StyledTitle onClick={() => history.push(`/game/${slug}`)}>
      {children}
      <StyledTip>Click on name for more info</StyledTip>
    </StyledTitle>
  );
};

export default GameCardTitle;
