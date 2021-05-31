import React from "react";
import { useSelector } from "react-redux";

import Board from "./Board";
import { selectGrid } from "../reducers/selectors";

const Game = React.memo(() => {
  const grid = useSelector(selectGrid);

  return <Board grid={grid} />;
});

export default Game;
