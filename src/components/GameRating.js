import React from 'react';
import styled from 'styled-components';

const StyledGameCardRating = styled.div`
  border: 1px solid ${(props) => (props.rating >= 70 ? '#44ff6d' : props.rating >= 50 ? '#ffe344' : '#ff5144')};
  color: ${(props) => (props.rating >= 70 ? '#44ff6d' : props.rating >= 50 ? '#ffe344' : '#ff5144')};
  font-size: 14px;
  padding: 3px 8px;
  border-radius: 8px;
  height: max-content;
  width: max-content;
`;

const GameRating = ({ rating }) => {
  return <StyledGameCardRating rating={rating}>{rating}</StyledGameCardRating>;
};

export default GameRating;
