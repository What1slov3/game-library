import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 35px;
  height: 35px;
  background: #222222;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & i {
    color: var(--text-gray);
  }

  &:hover i {
    color: #cccccc;
  }
`;

// Сортировка от большего к меньшему и наоборот

const SortToButton = ({ changeSort, sort }) => {
  return (
    <StyledWrapper onClick={() => changeSort()}>
      {sort === 'top' ? <i className="fas fa-sort-amount-up"></i> : <i className="fas fa-sort-amount-down"></i>}
    </StyledWrapper>
  );
};

export default SortToButton;
