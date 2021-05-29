// import {
//   moveUp,
//   moveDown,
//   moveLeft,
//   moveRight,
//   addTile,
// } from "../actions/boardActions";
import { MOVE_LEFT, MOVE_RIGHT, MOVE_UP } from "../actions/boardActions";

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

const getColumnsFromMatrix = (matrix) => {
  let [row] = matrix;
  return row.map((value, column) => matrix.map((row) => row[column]));
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

const tiltRowRight = (row) => {
  const nextRow = [...row];
  let i = row.length - 2;
  let j = row.length - 1;
  let points = 0;

  let hasSwapped = false;
  while (i >= 0) {
    if (nextRow[i] === nextRow[j] && nextRow[i] !== 0) {
      nextRow[j] = nextRow[i] + nextRow[j];
      nextRow[i] = 0;
      i--;
      hasSwapped = true;
      points += nextRow[j];
    } else if (nextRow[i] !== 0 && nextRow[j] !== 0) {
      j--;
      let temp = nextRow[j];
      nextRow[j] = nextRow[i];
      nextRow[i] = temp;
      i--;
      hasSwapped = true;
    } else if (nextRow[j] === 0 && nextRow[i] !== 0) {
      nextRow[j] = nextRow[i];
      nextRow[i] = 0;
      i--;
      hasSwapped = true;
    } else {
      i--;
    }
  }

  return {
    nextRow: !hasSwapped ? row : nextRow,
    points,
  };
};

const tiltColumnUp = (column) => {
  const nextColumn = [...column];
  let i = 0;
  let j = 0;
  let points = 0;
  let hasSwapped = false;
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
    case MOVE_RIGHT: {
      const nextGrid = [...state.grid];
      let newPoints = 0;
      nextGrid.forEach((row, index) => {
        const { nextRow, points } = tiltRowRight(row);
        nextGrid[index] = nextRow;
        newPoints += points;
      });

      return {
        ...state,
        grid: nextGrid,
        score: state.score + newPoints,
      };
    }

    case MOVE_UP: {
      const nextGrid = [...state.grid];
      let newPoints = 0;
      const columns = getColumnsFromMatrix(nextGrid);

      nextGrid.forEach((column, index) => {
        const { nextColumn, points } = tiltColumnUp(column);
        nextGrid[index] = nextColumn;
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
