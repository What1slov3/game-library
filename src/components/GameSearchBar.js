import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import SearchList from './SearchList';

const StyledWrapper = styled.div`
  width: 100%;
  margin-left: 30px;
  position: relative;

  &:hover > input {
    background: #fff;
    color: #000;
  }

  @media (max-width: 500px) {
    margin: 0;
    margin-top: 10px;
  }
`;

const StyledGameSearchBar = styled.input`
  width: 100%;
  padding: 10px 15px 10px 45px;
  background: #303030;
  border-radius: 100px;
  transition: all 0.2s;

  &:hover,
  &:focus {
    background: #fff;
    color: #000;
  }

  &::placeholder,
  & + i {
    color: #cccccc;
    transition: all 0.2s;
  }

  &:hover::placeholder,
  &:focus::placeholder,
  &:hover + i,
  &:focus + i {
    color: #8b8b8b;
  }
`;

//Поисковик игр
const GameSearchBar = ({ setSearchData, searchData, gamesList }) => {
  const [inFocus, setInFocus] = useState(false);

  const inputRef = useRef();
  const isTypingTimeoutRef = useRef();

  //При нажатии на лупу в поиске делаем фокус в конец
  const focusInEnd = () => {
    inputRef.current.focus();
    document.execCommand('selectAll', false, undefined);
    document.getSelection().collapseToEnd();
  };

  const onChange = (e) => {
    if (isTypingTimeoutRef.current) return;
    if (!isTypingTimeoutRef.current) {
      setSearchData(e.target.value);
      isTypingTimeoutRef.current = setTimeout(() => {
        isTypingTimeoutRef.current = null;
        setSearchData(e.target.value);
      }, 1000);
    }
  }

  const resetSearch = () => {
    setSearchData('');
    inputRef.current.value = '';
  }

  return (
    <StyledWrapper>
      <StyledGameSearchBar
        placeholder="Search game"
        ref={inputRef}
        onChange={(e) => onChange(e)}
        
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
      />
      <i
        className="fas fa-search"
        style={{ position: 'absolute', transform: 'translateY(-50%)', top: '50%', left: '15px', cursor: 'text' }}
        onClick={() => focusInEnd()}
      ></i>
      {searchData && inFocus && <SearchList gamesList={gamesList} resetSearch={resetSearch} />}
    </StyledWrapper>
  );
};

export default GameSearchBar;
