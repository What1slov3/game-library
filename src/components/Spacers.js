import React from 'react';
import styled from 'styled-components';

// Компонент для визуального разделения других компонентов
// Замена margin, чтобы делать компоненты независимее

const StyledSpacer = styled.div`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '100%'};
`;

const Spacer = (props) => {
  return <StyledSpacer {...props} />;
};

export default Spacer;
