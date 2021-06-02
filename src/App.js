import React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';
import Header from './components/Header';
import Spacer from './components/Spacers';
import GameInfoPage from './pages/GameInfoPage';
import MainPage from './pages/MainPage';

const AppWrapper = styled.div`
  background: var(--bg);
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  padding: 30px 30px 0;
  overflow: hidden;
`

const App = () => {
  return (
    <AppWrapper>
      <Header />
      <Spacer height="30px" />
      <Switch>
        <Route exact path="/" render={() => <MainPage />} /> 
        <Route exact path="/game/:gamename" render={() => <GameInfoPage />} /> 
      </Switch>
    </AppWrapper>
  );
}

export default App;
