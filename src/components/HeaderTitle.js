import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const StyledHeaderTitle = styled.div`
  font-size: 22px;
  font-weight: 800;
  cursor: pointer;
`;

const HeaderTitle = (props) => {
  const history = useHistory();
  return <StyledHeaderTitle onClick={() => history.push('/')}>{props.title}</StyledHeaderTitle>;
};

export default HeaderTitle;
