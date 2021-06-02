import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  color: var(--text-gray);
`;

const parseDate = (date) => {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dateSplit = date.split('-');

  return `${month[Number.parseInt(dateSplit[1])]} ${Number.parseInt(dateSplit[2])}, ${dateSplit[0]}`;
};

const GameRelease = ({releaseDate}) => {
  return <StyledWrapper>Released date: {parseDate(releaseDate)}</StyledWrapper>;
};

export default GameRelease;
