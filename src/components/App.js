import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Game from "./Game";
import GlobalStyle from "../GlobalStyle";
import { selectCurrentGameState, selectPoints } from "../reducers/selectors";

const AboveGame = styled.div`
  display: flex;
  margin-bottom: 10px;
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
  margin-bottom: 15px;
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
`;

const StyledGame = styled(Game)`
  background-color: red;
`;

const StyledH1 = styled.h1`
  font-family: Helvetica;
  text-align: center;
  font-size: 75px;
`;

const StyledH3 = styled.h3`
  font-size: 20px;
  margin: 0;
`;

const StyledH4 = styled.h4`
  font-size: 15px;
  margin: 0;
`;

const TextDiv = styled.div``;

const TitleContainer = styled.div`
  display: flex;
`;

const App = () => {
  const score = useSelector(selectPoints);
  const gameStatus = useSelector(selectCurrentGameState);

  return (
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
            {gameStatus}
          </AboveGame>
        </TextDiv>
        <StyledGame />
      </Container>
    </BodyDiv>
  );
};

export default App;
