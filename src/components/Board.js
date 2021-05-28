import React from "react";
import styled from "styled-components";

import Row from "./Row";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Board = ({ grid }) => {
  const addTileToBoard = () => {};
  const compressEqualValueTiles = () => {};

  // const grid = [];
  // for (let row = 0; row <= 4; row++) {
  //   grid.push([]);
  //   for (let col = 0; col < 4; col++) {
  //     grid[row].push(<Row key={`${col}${row}`} />);
  //   }
  // }
  // console.log(grid);

  return (
    <BoardContainer>
      {grid.map((row, index) => (
        <Row key={index} row={row} />
      ))}
    </BoardContainer>
  );

  // return (
  //   <BoardContainer>
  //     <Row />
  //     <Row />
  //     <Row />
  //     <Row />
  //   </BoardContainer>
  // );
};

export default Board;
