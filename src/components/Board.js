import React, { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import styled from "styled-components";

import { AnimateSharedLayout } from "framer-motion";

import Tile from "./Tile";
import {
  addTile,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
} from "../actions/boardActions";

const BoardContainer = styled.div`
  position: absolute;
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
        {grid.map((tile) => (
          <Tile
            id={tile.id}
            key={tile.id}
            position={tile.position}
            value={tile.value}
            grid={grid}
          />
        ))}
      </BoardContainer>
    </AnimateSharedLayout>
  );
});

export default Board;
