import React from 'react';
import styled from 'styled-components';

const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.align || 'stretch'};
  justify-content: ${(props) => props.justify || 'stretch'};
  margin: ${(props) => props.margin || '0'};
  padding: ${(props) => props.padding || '0'};
  flex-wrap: ${(props) => props.wrap || 'nowrap'};

  @media (max-width: 1200px) {
    flex-direction: ${(props) => props.tabletDirection || props.direction};
    align-items: ${(props) => props.tabletAlign || props.align};
    justify-content: ${(props) => props.tabletJustify || props.justify};
  }

  @media (max-width: 500px) {
    flex-direction: ${(props) => props.mobileDirection || props.direction};
    align-items: ${(props) => props.mobileAlign || props.align};
    justify-content: ${(props) => props.mobileJustify || props.justify};
  }
`;

const Flex = (props) => {
  return <StyledFlex {...props} />;
};

export default Flex;
