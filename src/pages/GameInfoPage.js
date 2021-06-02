import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GET_GAME, GET_SCREENSHOTS } from '../API/path';
import Flex from '../components/Flex';
import GameRating from '../components/GameRating';
import GameRelease from '../components/GameRelease';
import GameTitle from '../components/GameTitle';
import Grid from '../components/Grid';
import Loader from '../components/Loader';
import PlatformList from '../components/PlatfromList';
import Slider from '../components/Slider';
import Spacer from '../components/Spacers';

const StyledLoaderWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 138px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  height: calc(100vh - 108px);
  background: ${(props) => `radial-gradient(ellipse, rgba(16, 17, 19, 0) -77%, rgba(16, 17, 19, 1) 70%),
    url(${props.bgImage})`};
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: cover, cover, cover;
  background-position: center, center, center;
  position: relative;

  @media (max-width: 1200px) {
    overflow: auto;
    height: calc(100vh - 108px);
  }

  @media (max-width: 500px) {
    height: calc(100vh - 148px);
  }
`;

const StyledMediaWrapper = styled.div`
  height: calc(100vh - 138px);
  display: flex;
  align-items: center;

  @media (max-width: 1200px) {
    height: max-content;
  }
`;

const StyledInfoWrapper = styled.div`
  padding-right: 10px;
  height: calc(100vh - 138px);
  overflow: auto;

  @media (max-width: 1200px) {
    height: max-content;
    margin-top: 40px;
  }
`;

const StyledAboutTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
`;

const StyledAbout = styled.p`
  width: 80%;

  & > p {
    line-height: 1.6em;
    color: #ccc;
  }

  & > h3 {
    margin: 5px 0;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const StyledWebsiteTitle = styled.div`
  color: var(--text-gray);
  font-weight: 500;
  font-size: 17px;
`;

const StyledGameWebsiteLink = styled.a`
  font-size: 15px;
`;

const StyledPlaytime = styled.div`
  color: var(--text-gray);

  & > span {
    color: var(--text-main);
  }
`;

const StyledMobileRating = styled.div`
  display: none;
  margin-top: 20px;

  & > div > div {
    margin-left: 10px;
  }

  @media (max-width: 500px) {
    display: block;
  }
`;

const StyledLargeRating = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;

// Обнуляем слушатель для экономии ресурсов
window.onresize = () => {};

const GameInfoPage = ({}) => {
  const [game, setGame] = useState({}); // Данные об игре
  const [screenshots, setScreenshots] = useState(); // Загруженные скриншоты для слайдера
  const [loading, setLoading] = useState(true); // Вкл выкл лоадер

  useEffect(() => {
    // При рендере новой игры обнуляем данные и ставим прелоадер
    setScreenshots([]);
    setGame({});
    setLoading(true);

    // Получем slug их url страницы
    const gameSlug = window.location.pathname.substr(window.location.pathname.lastIndexOf('/') + 1);

    // Загрузка данных об игре и скриншотов
    fetch(GET_GAME(gameSlug))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        setGame(json);
        setLoading(false);
      });
    fetch(GET_SCREENSHOTS(gameSlug))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((json) => {
        setScreenshots(json.results);
      });
      // Совершаем это все при первом рендере и смене slug'а
  }, [window.location.pathname]);

  return loading ? (
    <StyledLoaderWrapper>
      <Loader />
    </StyledLoaderWrapper>
  ) : (
    <StyledWrapper bgImage={game.background_image || ''}>
      <Flex justify="center" direction="column" tabletJustify="center" tabletDirection="column">
        <Spacer height="30px" />
        <Grid columns="1fr 1fr" rows="1fr" gap="20px" tabletColumns="1fr">
          <StyledMediaWrapper>
            <Slider slidesArr={screenshots} />
          </StyledMediaWrapper>
          <StyledInfoWrapper>
            <Flex align="center" tabletAlign="center" mobileAlign="center">
              <GameTitle>{game.name_original || '[Empty name]'}</GameTitle>
              <Spacer width="20px" />
              <StyledLargeRating>
                <GameRating rating={game.metacritic || 0} />
              </StyledLargeRating>
            </Flex>
            <StyledMobileRating>
              <Flex>
                Rating: <GameRating rating={game.metacritic || 0} />
              </Flex>
            </StyledMobileRating>
            <Spacer height="10px" />
            <Flex align="center" mobileDirection="column">
              <PlatformList size="18px" availablePlatforms={game.parent_platforms} />
              <Spacer width="20px" height="10px" />
              <GameRelease releaseDate={game.released || '1970-01-01'} />
            </Flex>
            <Spacer height="10px" />
            <StyledPlaytime>
              Average playtime: <span>{game.playtime || '~'} hours</span>
            </StyledPlaytime>
            <Spacer height="5%" />
            <StyledAboutTitle>About</StyledAboutTitle>
            <Spacer height="20px" />
            <StyledAbout dangerouslySetInnerHTML={{ __html: game.description || 'Empty description' }}></StyledAbout>
            <Spacer height="20px" />
            <StyledWebsiteTitle>Website</StyledWebsiteTitle>
            <StyledGameWebsiteLink href={game.website || '#'} target="_blank">
              {game.website || "Website doesn't exists"}
            </StyledGameWebsiteLink>
          </StyledInfoWrapper>
        </Grid>
      </Flex>
    </StyledWrapper>
  );
};

export default GameInfoPage;
