import React from 'react';
import styled from 'styled-components';

//Просто гриды
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-template-rows: ${(props) => props.rows};
  grid-gap: ${(props) => props.gap || '0'};
  height: ${(props) => props.height || 'auto'};
  width: ${(props) => props.width || 'auto'};
  min-height: ${(props) => props.minHeight || '0'};
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '0'};

  @media (max-width: 1200px) {
    grid-template-columns: ${(props) => props.tabletColumns};
    grid-template-rows: ${(props) => props.tabletRows};
    grid-gap: ${(props) => props.tabletGap || props.gap};
  }

  @media (max-width: 500px) {
    grid-template-columns: ${(props) => props.mobileColumns};
    grid-template-rows: ${(props) => props.mobileRows};
    grid-gap: ${(props) => props.mobileGap || props.gap};
  }
`;

const Grid = (props) => {
  return <StyledGrid {...props} />;
};

export default Grid;
