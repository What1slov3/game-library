import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import GameCard from '../components/GameCard/GameCard';
import Grid from '../components/Grid';
import SortBar from '../components/SortBar';
import Spacer from '../components/Spacers';
import { GET_GAMES_PATH } from '../API/path';
import InfiniteScroll from '../components/InfiniteScroll';
import Loader from '../components/Loader';

const StyledMainPage = styled.div``;

const StyledCardContainer = styled.div`
  width: 100%;
  max-width: calc(100vw - 60px);
  padding: 0 0 20px 10px;
  height: calc(100vh - 173px);
  overflow: auto;
`;

const StyledNothing = styled.div`
  height: 100%;
  max-width: calc(100vw - 60px);
  height: calc(100vh - 193px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

//Формулы для расчета колонок и максимально ширины
const calcCardWidth = (columnValue) => {
  return (((document.body.clientWidth - 70 - columnValue * 20) / columnValue) >> 0) + 'px';
};

const calcColumnValue = () => {
  return document.body.clientWidth > 500 ? Math.round(((document.body.clientWidth - 70) / 400)) : 1;
};



const hashCode = (string) => {
  let hash = 0,
    i,
    chr;
  if (string.length === 0) return hash;
  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};


// Соответствие названия к id платформы в API
const platforms = {
  pc: 1,
  playstation: 2,
  xbox: 3,
  ios: 4,
  mac: 5,
  linux: 6,
  nintendo: 7,
  android: 8,
};

// Соответствие выбранного фильтра в lower case к запросу в API
const order = {
  rating: 'metacritic',
  'release date': 'released',
};

const MainPage = () => {
  const [columnValue, setColumnValue] = useState(calcColumnValue());
  const [cardWidth, setCardWidth] = useState(
    calcCardWidth(((document.body.clientWidth - 70 - calcColumnValue() * 20) / calcColumnValue()) >> 0)
  );

  const [gamesList, setGamesList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Текущее значение фильтров, храним здесь, т.к. данные нужны именно на этом уровне
  const [selectedValue, setSelectedValue] = useState({
    platform: '',
    order: '',
  });
  const [sortTo, setSortTo] = useState('down');

  useEffect(() => {
    // Формируем запрос к API на основе выбранных фильтров
    const requestLink =
      GET_GAMES_PATH +
      `&page=${page}&page_size=${30}${
        selectedValue.platform && `&parent_platforms=${platforms[selectedValue.platform.toLowerCase()]}`
      }${
        selectedValue.order && sortTo === 'top'
          ? `&ordering=${order[selectedValue.order.toLowerCase()]}`
          : `&ordering=-${order[selectedValue.order.toLowerCase()]}`
      } `;

    // Начиная загрузку новых данных ставим лоадер
    setLoading(true);
    fetch(requestLink)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => {
        let result = [];
        // Форматируем полученные данные, т.к. нам не нужны все, то не к чему забивать память
        json.results.map((game) => {
          result.push({
            id: game.id,
            slug: game.slug,
            name: game.name,
            released: game.released,
            background_image: game.background_image,
            metacritic: game.metacritic,
            parent_platforms: game.parent_platforms,
          });
        });
        // Обновляем стейт
        setGamesList([...gamesList, ...result]);
        // Убираем лоадер
        setLoading(false);
      });
  }, [page, selectedValue.platform, selectedValue.order, sortTo]);

  const increasePage = () => {
    setPage(page + 1);
  };

  // Динамический расчет оптимального количества колонок и ширины карточек, для чтобы в них адекватно рассчитывалось переполнение

  const resizeTimeoutRef = useRef();
  const onResize = () => {
    if (!resizeTimeoutRef.current) {
      const columnValueCalc = calcColumnValue();
      setColumnValue(columnValueCalc);
      setCardWidth(calcCardWidth(columnValueCalc));
      resizeTimeoutRef.current = setTimeout(() => (resizeTimeoutRef.current = null), 100);
    }
  };
  window.addEventListener('resize', onResize);

  // Рендерим карточки в текущий рисующийся столбец грид сетки

  const renderCards = (start, bias) => {
    const result = [];
    for (let i = start; i < gamesList.length; i += bias) {
      const game = gamesList[i];
      result.push(
        <GameCard
          key={hashCode(game.slug)}
          cardWidth={cardWidth}
          bgImage={game.background_image || ''}
          platforms={game.parent_platforms || []}
          rating={game.metacritic || 0}
          releaseDate={game.released || '1970-01-01'}
          name={game.name}
          slug={game.slug}
          index={game.id + i}
        />
      );
    }
    return result;
  };

  // Запускаем рендер столбца

  const renderColumns = () => {
    const result = [];
    for (let i = 0; i < columnValue; i++) {
      result.push(<div key={i}>{renderCards(i, columnValue)}</div>);
    }
    return result;
  };

  return (
    <StyledMainPage>
      <SortBar
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        sortTo={sortTo}
        setSortTo={setSortTo}
        setGamesList={setGamesList}
        setPage={setPage}
      />
      <Spacer height="30px" />
      <StyledCardContainer>
        {gamesList.length > 0 && (
          <InfiniteScroll next={increasePage} loading={loading} loader={<Loader />}>
            <Grid columns={`repeat(${columnValue}, 1fr)`} rows="1fr" gap="20px" margin="0 10px 0 0" minHeight="100vh">
              {renderColumns()}
            </Grid>
          </InfiniteScroll>
        )}
        {gamesList.length === 0 && !loading && (
          <StyledNothing>
            <div style={{ height: 'max-content' }}>Nothing to view</div>
          </StyledNothing>
        )}
        {gamesList.length === 0 || loading && (
          <StyledNothing>
            <Loader />
          </StyledNothing>
        )}
      </StyledCardContainer>
    </StyledMainPage>
  );
};

export default MainPage;
