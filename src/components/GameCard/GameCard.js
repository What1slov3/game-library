import React from 'react';
import styled from 'styled-components';
import Flex from '../Flex';
import GameCardBackground from './GameCardBackground';
import PlatformList from '../PlatfromList';
import GameRating from '../GameRating';
import GameRelease from '../GameRelease';
import GameCardTitle from './GameCardTitle';

const StyledWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.cardWidth};
  height: max-content;
  background: #222222;
  border-radius: 10px;
  transition: 0.2s;

  &:hover {
    transform: scale(1.02) translateY(1%);
  }

  &:hover div > span {
    height: 20px;
  }

  &:nth-child(n + 2) {
    margin-top: 20px;
  }
`;

const StyledInner = styled.div`
  padding: 10px 15px 20px;
`;

const GameCard = ({ cardWidth, platforms, bgImage, rating, name, releaseDate, slug, index }) => {
  return (
    <StyledWrapper cardWidth={cardWidth}>
      <GameCardBackground bg={bgImage} />
      <StyledInner>
        <Flex justify="space-between" mobileJustify="space-between">
          <PlatformList availablePlatforms={platforms} key={index + rating} size="16px" />
          <GameRating rating={rating} />
        </Flex>
        <GameCardTitle slug={slug}>{name}</GameCardTitle>
        <GameRelease releaseDate={releaseDate} />
      </StyledInner>
    </StyledWrapper>
  );
};

export default GameCard;
