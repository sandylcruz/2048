// import {
//   moveUp,
//   moveDown,
//   moveLeft,
//   moveRight,
//   addTile,
// } from "../actions/boardActions";
import { MOVE_LEFT } from "../actions/boardActions";

const newBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const generateRandomCoordinate = () => {
  return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
};

const randomCoordinates = [
  generateRandomCoordinate(),
  generateRandomCoordinate(),
];

randomCoordinates.forEach((coordinate) => {
  const number = Math.random() < 0.9 ? 2 : 4;
  const [i, j] = coordinate;
  newBoard[i][j] = number;
});

const initialState = {
  grid: newBoard,
  score: 0,
  bestScore: null,
};

const tiltRowLeft = (row) => {
  const nextRow = [...row];
  let i = 0;
  let j = 1;
  let points = 0;

  let hasSwapped = false;
  while (j < nextRow.length) {
    if (nextRow[i] === nextRow[j] && nextRow[i] !== 0) {
      nextRow[i] = nextRow[i] + nextRow[j];
      nextRow[j] = 0;
      j++;
      hasSwapped = true;
      points += nextRow[i];
    } else if (nextRow[i] !== 0 && nextRow[j] !== 0) {
      i++;
      let temp = nextRow[j];
      nextRow[j] = nextRow[i];
      nextRow[i] = temp;
      j++;
      hasSwapped = true;
    } else if (nextRow[i] === 0 && nextRow[j] !== 0) {
      let temp = nextRow[j];
      nextRow[j] = nextRow[i];
      nextRow[i] = temp;
      j++;
      hasSwapped = true;
    } else {
      j++;
    }
  }

  return {
    nextRow: !hasSwapped ? row : nextRow,
    points,
  };
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_LEFT: {
      const nextGrid = [...state.grid];
      let newPoints = 0;
      nextGrid.forEach((row, index) => {
        const { nextRow, points } = tiltRowLeft(row);
        nextGrid[index] = nextRow;
        newPoints += points;
      });

      return {
        ...state,
        grid: nextGrid,
        score: state.score + newPoints,
      };
    }

    // case "UP":
    //   const upResult = moveUp(state.grid);
    //   return {
    //     ...state,
    //     upResult,
    //   };
    // case "DOWN":
    //   const downResult = moveDown(state.grid);
    //   return {
    //     ...state,
    //     downResult,
    //   };
    // case "RIGHT":
    //   const rightResult = moveRight(state.grid);
    //   return {
    //     ...state,
    //     rightResult,
    //   };
    // case "LEFT":
    //   const leftResult = moveLeft(state.grid);
    //   return {
    //     ...state,
    //     leftResult,
    //   };
    // case "ADD_TILE":
    //   const newTile = addTile();
    //   return {
    //     ...state,
    //     newTile,
    //   };
    // case "RESTART":
    //   return state;
    default:
      return state;
  }
};

export default boardReducer;
