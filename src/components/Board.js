import React, { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import styled from "styled-components";

import { motion, AnimateSharedLayout } from "framer-motion";

import Row from "./Row";
import {
  addTile,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
} from "../actions/boardActions";

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 5px solid #4a4e69;
  border-bottom: 5px solid #4a4e69;
  border-radius: 7px;
`;

const Board = React.memo(({ grid }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp": {
          batch(() => {
            dispatch(moveUp());
            dispatch(addTile());
          });
          break;
        }
        case "ArrowDown": {
          batch(() => {
            dispatch(moveDown());
            dispatch(addTile());
          });
          break;
        }
        case "ArrowLeft": {
          batch(() => {
            dispatch(moveLeft());
            dispatch(addTile());
          });
          break;
        }
        case "ArrowRight": {
          batch(() => {
            dispatch(moveRight());
            dispatch(addTile());
          });
          break;
        }
        default: {
          break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <AnimateSharedLayout>
      <BoardContainer>
        {grid.map((row, index) => (
          <Row key={index} row={row} />
        ))}
      </BoardContainer>
    </AnimateSharedLayout>
  );
});

export default Board;
