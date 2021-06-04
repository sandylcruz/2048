import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled, { ThemeProvider } from "styled-components";

import Game from "./Game";
import GlobalStyle from "../GlobalStyle";
import { lightTheme, darkTheme } from "./Themes";
import { selectCurrentGameState, selectPoints } from "../reducers/selectors";
import Toggle from "./Toggle";

const AboveGame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: -50px;
`;

const BodyDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div``;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 400px;
`;

const RestartButton = styled.button`
  margin-top: 400px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  position: relative;
  float: right;
  padding: 5px;
  border-radius: 3px;
  height: 80px;
`;

const StyledGame = styled(Game)`
  background-color: red;
`;

const StyledH1 = styled.h1`
  font-family: helvetica;
  text-align: center;
  font-size: 105px;
`;

const StyledH3 = styled.h3`
  font-size: 20px;
  margin: 0;
  padding: 0;
`;

const StyledH4 = styled.h4`
  font-size: 15px;
  margin: 0;
`;

const TextDiv = styled.div``;

const TitleContainer = styled.div`
  display: flex;
`;

const ToggleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UnderGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = React.memo(() => {
  const score = useSelector(selectPoints);
  const gameStatus = useSelector(selectCurrentGameState);
  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const restartGame = () => {};

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <BodyDiv>
        <Container>
          <GlobalStyle />
          <TextDiv>
            <HeaderDiv>
              <TitleContainer>
                <StyledH1>2048</StyledH1>
              </TitleContainer>
              <ScoreContainer>
                <StyledH3>SCORE</StyledH3>
                <StyledH4>{score}</StyledH4>
              </ScoreContainer>
            </HeaderDiv>
            <AboveGame>
              <p>
                Join the numbers and get to the <strong>2048 tile!</strong>
              </p>

              <ToggleDiv>
                <Toggle onChange={themeToggler}>Switch Theme</Toggle>
              </ToggleDiv>
            </AboveGame>
            {/* <h3>{gameStatus}</h3> */}
          </TextDiv>
          <StyledGame restartGame={restartGame} />
          <UnderGame>
            <RestartButton type="submit">Restart game</RestartButton>
          </UnderGame>
        </Container>
      </BodyDiv>
    </ThemeProvider>
  );
});

export default App;
