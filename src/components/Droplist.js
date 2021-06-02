import React from 'react';
import styled, { keyframes } from 'styled-components';

const openAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1
  }
`;

const StyledWrapper = styled.div`
  position: relative;
  width: ${(props) => props.width || 'max-content'};
  height: max-content;
  font-size: 14px;
  padding: 3px 8px;
  border-radius: ${(props) => (props.isOpen ? '8px 8px 0 0' : '8px')};
  background: ${(props) => (props.isOpen ? '#fff' : '#222222')};
  cursor: pointer;
  user-select: none;
`;

const StyledDroplist = styled.div`
  position: absolute;
  left: 0;
  width: ${(props) => props.width};
  padding: 3px 8px 12px;
  border-radius: 0 0 8px 8px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  z-index: 1000;

  & > * {
    animation: ${openAnimation} 0.4s forwards;
  }
`;

const StyledDroplistItem = styled.div`
  padding: 5px;
  border-radius: 8px;
  color: ${(props) => (props.isOpen ? '#000' : 'var(--text-main)')};

  &:hover {
    background: #f1f1f1;
  }
`;

const StyledSelectedValue = styled.div`
  color: ${(props) => (props.isOpen ? '#000' : props.selectedValue ? '#fff' : 'var(--text-gray)')};
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => (props.isOpen ? '#000' : '#cccccc')};
  }

  & > i {
    color: var(--text-gray);
  }
`;

const Droplist = ({ valuesList, selectedValue, onSelect, title, width, onOpen, isOpen }) => {
  const selectedValueOverride = selectedValue[title.toLowerCase()];

  document.onclick = (e) => {
    if (!e.target.dataset.target) onOpen('');
  };

  const renderDroplistItems = () => {
    return valuesList.map((value) => {
      if (value !== selectedValueOverride) {
        return (
          <StyledDroplistItem key={value} onClick={() => onSelect(title, value)} isOpen={isOpen}>
            {value}
          </StyledDroplistItem>
        );
      }
    });
  };

  return (
    <StyledWrapper onClick={() => onOpen(title)} width={width} data-target={!selectedValueOverride} isOpen={isOpen}>
      <StyledSelectedValue data-target={!selectedValueOverride} selectedValue={selectedValueOverride} isOpen={isOpen}>
        {selectedValueOverride || title}
        {!isOpen && (
          <i className="fas fa-chevron-down" data-target={!selectedValueOverride} onClick={() => onOpen(title)}></i>
        )}
      </StyledSelectedValue>
      {isOpen && <StyledDroplist width={width}>{renderDroplistItems()}</StyledDroplist>}
    </StyledWrapper>
  );
};

export default Droplist;
