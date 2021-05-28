import React from "react";
import styled from "styled-components";

// import Board from "./Board";
import Game from "./Game";

import GlobalStyle from "../GlobalStyle";

const BodyDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const ScoreContainer = styled.div`
  display: flex;
  border: 1px solid black;
  padding: 10px;
`;

const StyledH1 = styled.h1`
  font-family: Helvetica;
  text-align: center;
  font-size: 75px;
`;

const StyledH3 = styled.h3`
  font-size: 25px;
`;

// const StyledH4 = styled.h4`
//   font-size: 15px;
// `;

const TitleContainer = styled.div``;

const App = () => {
  // const [state, setState] = useState("");

  // const handler = (event) => {};

  return (
    <BodyDiv>
      <GlobalStyle />
      <HeaderDiv>
        <TitleContainer>
          <StyledH1>2048</StyledH1>
        </TitleContainer>
        <ScoreContainer>
          <StyledH3>SCORE</StyledH3>
          {/* <StyledH4>1000</StyledH4> */}
        </ScoreContainer>
      </HeaderDiv>
      <Game />
    </BodyDiv>
  );
};

export default App;
