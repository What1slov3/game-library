import React, { useState } from 'react';
import styled from 'styled-components';
import Droplist from './Droplist';
import Flex from './Flex';
import SortToButton from './SortToButton';
import Spacer from './Spacers';

// Панель с кнопками сортировки

const SortBar = ({ selectedValue, setSelectedValue, sortTo, setSortTo, setGamesList, setPage }) => {
  const [openedDroplist, setOpenedDroplist] = useState(''); //Храним включенное дроп меню

  // Обнуляем карточки с играми при смене фильтра для рендера новых
  const resetCards = () => {
    setGamesList([]);
    setPage(1);
  };

  // Устанавливаем значения в MainPage
  const onSelect = (title, value) => {
    setSelectedValue({ ...selectedValue, [title.toLowerCase()]: value });
    resetCards();
  };

  const changeSort = () => {
    sortTo === 'top' ? setSortTo('down') : setSortTo('top');
    resetCards();
  };

  return (
    <Flex padding="0 0 0 10px" mobileDirection="column">
      <Droplist
        title="Platform"
        valuesList={['PC', 'PlayStation', 'Xbox', 'iOS', 'Mac', 'Linux', 'Nintendo', 'Android']}
        width="200px"
        isOpen={openedDroplist === 'Platform'}
        onOpen={setOpenedDroplist}
        onSelect={onSelect}
        selectedValue={selectedValue}
      />
      <Spacer width="20px" height="10px" />
      <Flex align="center">
        <Droplist
          title="Order"
          valuesList={['Rating', 'Release date']}
          width="200px"
          isOpen={openedDroplist === 'Order'}
          onOpen={setOpenedDroplist}
          onSelect={onSelect}
          selectedValue={selectedValue}
        />
        <Spacer width="20px" />
        <SortToButton changeSort={changeSort} sort={sortTo} />
      </Flex>
    </Flex>
  );
};

export default SortBar;
