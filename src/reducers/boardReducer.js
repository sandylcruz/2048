import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
} from "../actions/boardActions";

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

const tiltGridDown = (grid) => {
  const nextGrid = [];

  grid.forEach((row) => {
    const nextRow = [...row];
    nextGrid.push(nextRow);
  });

  let n = 0;
  let points = 0;

  while (n < nextGrid.length) {
    let i = nextGrid.length - 2;
    let j = nextGrid.length - 1;
    while (i >= 0) {
      if (nextGrid[i][n] === 0 && nextGrid[j][n] === 0) {
        i--;
      } else if (nextGrid[j][n] === 0) {
        nextGrid[j][n] = nextGrid[i][n];
        nextGrid[i][n] = 0;
        i--;
      } else if (nextGrid[i][n] === nextGrid[j][n]) {
        nextGrid[j][n] = nextGrid[i][n] + nextGrid[j][n];
        nextGrid[i][n] = 0;
        points += nextGrid[j][n];
        i--;
        j--;
      } else if (nextGrid[i][n] !== 0 && nextGrid[j][n] !== 0 && j - i !== 1) {
        j--;
        nextGrid[j][n] = nextGrid[i][n];
        nextGrid[i][n] = 0;
        i--;
      } else if (nextGrid[i][n] !== 0 && nextGrid[j][n] !== 0 && j - i === 1) {
        i--;
        j--;
      } else {
        j--;
      }
    }
    n++;
  }
  return {
    grid: nextGrid,
    points,
  };
};

const tiltGridUp = (grid) => {
  const nextGrid = [];

  grid.forEach((row) => {
    const nextRow = [...row];
    nextGrid.push(nextRow);
  });

  let n = 0;
  let points = 0;

  while (n < nextGrid.length) {
    let i = 0;
    let j = 1;
    while (j < nextGrid.length) {
      if (nextGrid[i][n] === 0 && nextGrid[j][n] === 0) {
        j++;
      } else if (nextGrid[i][n] === 0) {
        nextGrid[i][n] = nextGrid[j][n];
        nextGrid[j][n] = 0;
        j++;
      } else if (nextGrid[i][n] === nextGrid[j][n]) {
        nextGrid[i][n] = nextGrid[i][n] + nextGrid[j][n];
        nextGrid[j][n] = 0;
        points += nextGrid[i][n];
        i++;
        j++;
      } else if (nextGrid[i][n] !== 0 && nextGrid[j][n] !== 0 && j - i !== 1) {
        i++;
        nextGrid[i][n] = nextGrid[j][n];
        nextGrid[j][n] = 0;
        j++;
      } else if (nextGrid[i][n] !== 0 && nextGrid[j][n] !== 0 && j - i === 1) {
        i++;
        j++;
      } else {
        j++;
      }
    }
    n++;
  }
  return {
    grid: nextGrid,
    points,
  };
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

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_DOWN: {
      const { grid, points } = tiltGridDown(state.grid);

      return {
        ...state,
        grid: grid,
        score: state.score + points,
      };
    }
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
      const { grid, points } = tiltGridUp(state.grid);

      return {
        ...state,
        grid: grid,
        score: state.score + points,
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
