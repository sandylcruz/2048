import React from "react";
import { useSelector } from "react-redux";

import Board from "./Board";
import Modal from "./Modal";
import { selectCurrentGameState, selectGrid } from "../reducers/selectors";

const Game = React.memo(({ restartGame }) => {
  // const grid = useSelector(selectGrid);
  const gameState = useSelector(selectCurrentGameState);
  const shouldShowModal = gameState === "won" || gameState === "lost";
  console.log(gameState);

  const grid = [
    {
      value: 0,
      position: 0,
      id: 1,
    },
    {
      value: 2,
      position: 1,
      id: 2,
    },
    {
      value: 4,
      position: 2,
      id: 3,
    },
    {
      value: 8,
      position: 3,
      id: 4,
    },
    {
      value: 16,
      position: 4,
      id: 20,
    },
    {
      value: 32,
      position: 5,
      id: 5,
    },
    {
      value: 64,
      position: 6,
      id: 6,
    },
    {
      value: 128,
      position: 7,
      id: 7,
    },
    {
      value: 256,
      position: 8,
      id: 8,
    },
    {
      value: 512,
      position: 9,
      id: 9,
    },
    {
      value: 1024,
      position: 10,
      id: 10,
    },
    {
      value: 1024,
      position: 11,
      id: 11,
    },
    {
      value: 2048,
      position: 12,
      id: 12,
    },
    {
      value: 0,
      position: 13,
      id: 13,
    },
    {
      value: 0,
      position: 14,
      id: 14,
    },

    {
      value: 0,
      position: 15,
      id: 15,
    },
  ];

  return (
    <div>
      {shouldShowModal && (
        <Modal restartGame={restartGame}>
          {gameState === "won" ? "You won!" : "You lost!"}
        </Modal>
      )}
      <Board grid={grid} />
    </div>
  );
});

export default Game;
