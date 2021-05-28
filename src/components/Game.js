import React, { useState } from "react";

import Board from "./Board";

const Game = () => {
  const [board, setBoard] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  return <Board />;
};

export default Game;
