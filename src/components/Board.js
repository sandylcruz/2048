import React from "react";
import styled from "styled-components";

import Row from "./Row";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Board = () => {
  const addTileToBoard = () => {};
  const compressEqualValueTiles = () => {};

  return (
    <BoardContainer>
      <Row />
      <Row />
      <Row />
      <Row />
    </BoardContainer>
  );
};

export default Board;
