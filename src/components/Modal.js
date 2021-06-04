import React from "react";
import { useSelector } from "react-redux";

import { selectCurrentGameState } from "../reducers/selectors";

const Modal = ({ restartGame }) => {
  const gameState = useSelector(selectCurrentGameState);

  if (gameState === "lost" || gameState === "won") {
    const text = gameState === "won" ? "You won!" : "You lost!";
    return (
      <div className="modal-screen">
        <div className="modal-content">
          <p>{text}</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      </div>
    );
  }
};

export default Modal;
