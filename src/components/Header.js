import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GET_GAMES_PATH } from '../API/path';
import Flex from './Flex';
import GameSearchBar from './GameSearchBar';
import NavTitle from './HeaderTitle';

const Header = ({}) => {
  const [searchData, setSearchData] = useState(''); //Введнное название
  const [gamesList, setGamesList] = useState([]); //Полученные игры

  // Загружаем здесь и предеаем листу список найденных игр
  useEffect(() => {
    let result = [];
    fetch(GET_GAMES_PATH + `&search=${searchData}`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => {
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
        setGamesList(result);
      });
  }, [searchData]);

  return (
    <Flex padding="0 0 0 10px" align="center" mobileDirection="column">
      <NavTitle title="GameLibrary" />
      <GameSearchBar setSearchData={setSearchData} searchData={searchData} gamesList={gamesList} />
    </Flex>
  );
};

export default Header;
