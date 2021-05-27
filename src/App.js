import Board from "./Board";

import styled from "styled-components";

import GlobalStyle from "./GlobalStyle";

const BodyDiv = styled.div`
  height: 100%;
  // background-color: pink;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const StyledH1 = styled.h1`
  font-family: helvetica;
  text-align: center;
`;

const App = () => {
  return (
    <BodyDiv>
      <GlobalStyle />
      <header>
        <HeaderDiv>
          <StyledH1>2048</StyledH1>
          <h3>Score</h3>
        </HeaderDiv>

        <Board />
      </header>
    </BodyDiv>
  );
};

export default App;
