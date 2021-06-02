import React from 'react';
import { useHistory } from 'react-router';
import styled, {keyframes} from 'styled-components';
import Flex from './Flex';
import PlatformList from './PlatfromList';
import Spacer from './Spacers';

const open = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 65vh;
    opacity: 1;
  }
`

const StyledWrapper = styled.div`
  position: absolute;
  padding: 15px;
  border-radius: 19px;
  background: #000;
  width: 100%;
  margin-top: 10px;
  z-index: 1000;
  height: 65vh;
  overflow: hidden;
  animation: ${open} .6s forwards;
`;

const StyledListItem = styled.div`
  cursor: pointer;

  &:not(:first-of-type) {
    margin-top: 10px;
  }

  &:hover > div > div > * {
    color: var(--text-gray);
  }
`;

const StyledGameIcon = styled.div`
  background: url(${(props) => props.bg});
  background-size: cover;
  background-position: center;
  height: 60px;
  min-width: 45px;
  border-radius: 8px;
`;

const StyledGameName = styled.div`
  font-weight: 600;
  transition: 0.2s;

  @media (max-width: 500px) {
    font-size: 14px;
  }
`;

const StyledList = styled.div`
  overflow: auto;
  height: calc(65vh - 60px);
  border-radius: 8px;
`;

const StyledGamesCount = styled.div`
  color: var(--text-gray);

  & span {
    color: #fff;
  }
`;

const SearchList = ({ gamesList, resetSearch }) => {
  const history = useHistory();

  const renderGames = () => {
    return gamesList.map((game, index) => {
      return (
        <StyledListItem onMouseDown={() => {
          history.push(`/game/${game.slug}`);
          resetSearch();
        }}>
          <Flex align="center">
            <StyledGameIcon bg={game.background_image} />
            <div style={{ marginLeft: '20px' }}>
              <StyledGameName>{game.name}</StyledGameName>
              <PlatformList availablePlatforms={game.parent_platforms} index={index} />
            </div>
          </Flex>
        </StyledListItem>
      );
    });
  };

  return (
    <StyledWrapper>
      <StyledGamesCount>
        Games found: <span>{gamesList.length}</span>
      </StyledGamesCount>
      <Spacer height="10px" />
      <StyledList>{renderGames()}</StyledList>
    </StyledWrapper>
  );
};

export default SearchList;
