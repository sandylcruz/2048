import {
  ADD_TILE,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
} from "../actions/boardActions";
import isEqual from "lodash/isEqual";

const newBoard = [];
for (let i = 0; i < 4; i++) {
  const row = [];
  for (let j = 0; j < 4; j++) {
    const tile = {
      value: 0,
      id: null,
    };

    row.push(tile);
  }
  newBoard.push(row);
}

const generateRandomCoordinate = () => {
  return [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
};

const coordinateOne = generateRandomCoordinate();
let coordinateTwo = generateRandomCoordinate();

while (
  coordinateTwo[0] === coordinateOne[0] &&
  coordinateTwo[1] === coordinateOne[1]
) {
  coordinateTwo = generateRandomCoordinate();
}

const randomCoordinates = [coordinateOne, coordinateTwo];
const randomNumber = () => {
  return Math.random() < 0.9 ? 2 : 4;
};
let id = 1;

randomCoordinates.forEach((coordinate) => {
  const number = randomNumber();
  const [i, j] = coordinate;

  newBoard[i][j] = {
    value: number,
    id: id++,
  };
  console.log(newBoard[i][j].id);
});

// const lostBoard = [
//   [2, 4, 2, 4],
//   [4, 2, 4, 2],
//   [2, 4, 2, 4],
//   [4, 2, 4, 2],
// ];

const generateGrid = (simpleGrid) => {
  let id = 1;
  return simpleGrid.map((row) => {
    return row.map((number) => {
      if (number === 0) {
        return {
          value: 0,
          id: null,
        };
      } else {
        return {
          value: number,
          id: id++,
        };
      }
    });
  });
};

const bugBoard = generateGrid([
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 8, 0, 0],
  [8, 16, 0, 16],
]);

const initialState = {
  grid: bugBoard,
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
      if (nextGrid[i][n].value === 0 && nextGrid[j][n].value === 0) {
        i--;
      } else if (nextGrid[j][n].value === 0) {
        nextGrid[j][n] = {
          value: nextGrid[i][n].value + nextGrid[j][n].value,
          id: nextGrid[i][n].id,
        };

        nextGrid[i][n] = {
          value: 0,
          id: null,
        };

        i--;
      } else if (nextGrid[i][n].value === 0) {
        i--;
      } else if (nextGrid[i][n].value === nextGrid[j][n].value) {
        nextGrid[j][n] = {
          value: nextGrid[i][n].value + nextGrid[j][n].value,
          id: nextGrid[i][n].id,
        };

        nextGrid[i][n] = {
          value: 0,
          id: null,
        };
        points += nextGrid[j][n].value;
        i--;
        j--;
      } else if (
        nextGrid[i][n].value !== 0 &&
        nextGrid[j][n].value !== 0 &&
        j - i !== 1
      ) {
        j--;
        nextGrid[j][n] = nextGrid[i][n];
        nextGrid[i][n] = {
          value: 0,
          id: null,
        };
        i--;
      } else if (
        nextGrid[i][n].value !== 0 &&
        nextGrid[j][n].value !== 0 &&
        j - i === 1
      ) {
        i--;
        j--;
      } else {
        j--;
      }
    }
    n++;
  }

  nextGrid.forEach((row, i) => {
    const oldRow = grid[i];
    if (isEqual(oldRow, row)) {
      nextGrid[i] = oldRow;
    }
  });

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
      if (nextGrid[i][n].value === 0 && nextGrid[j][n].value === 0) {
        j++;
      } else if (nextGrid[i][n].value === 0) {
        nextGrid[i][n] = {
          value: nextGrid[i][n].value + nextGrid[j][n].value,
          id: nextGrid[j][n].id,
        };

        nextGrid[j][n] = {
          value: 0,
          id: null,
        };
        j++;
      } else if (nextGrid[j][n].value === 0) {
        j++;
      } else if (nextGrid[i][n].value === nextGrid[j][n].value) {
        nextGrid[i][n] = {
          value: nextGrid[i][n].value + nextGrid[j][n].value,
          id: nextGrid[j][n].id,
        };
        nextGrid[j][n] = {
          value: 0,
          id: null,
        };
        points += nextGrid[i][n].value;
        i++;
        j++;
      } else if (
        nextGrid[i][n].value !== 0 &&
        nextGrid[j][n].value !== 0 &&
        j - i !== 1
      ) {
        i++;
        nextGrid[i][n] = nextGrid[j][n];
        nextGrid[j][n] = {
          value: 0,
          id: null,
        };
        j++;
      } else if (
        nextGrid[i][n].value !== 0 &&
        nextGrid[j][n].value !== 0 &&
        j - i === 1
      ) {
        i++;
        j++;
      } else {
        j++;
      }
    }
    n++;
  }
  nextGrid.forEach((row, i) => {
    const oldRow = grid[i];
    if (isEqual(oldRow, row)) {
      nextGrid[i] = oldRow;
    }
  });

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
    if (nextRow[i].value === nextRow[j].value && nextRow[i].value !== 0) {
      nextRow[i] = {
        value: nextRow[i].value + nextRow[j].value,
        id: nextRow[j].id,
      };
      nextRow[j] = {
        value: 0,
        id: null,
      };
      j++;
      hasSwapped = true;
      points += nextRow[i].value;
    } else if (nextRow[i].value !== 0 && nextRow[j].value !== 0) {
      i++;
      let temp = nextRow[j];
      nextRow[j] = nextRow[i];
      nextRow[i] = temp;
      j++;
      hasSwapped = true;
    } else if (nextRow[i].value === 0 && nextRow[j].value !== 0) {
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
    if (nextRow[i].value === nextRow[j].value && nextRow[i].value !== 0) {
      nextRow[j] = {
        value: nextRow[i].value + nextRow[j].value,
        id: nextRow[i].id,
      };

      nextRow[i] = {
        value: 0,
        id: null,
      };

      i--;
      hasSwapped = true;
      points += nextRow[j].value;
    } else if (nextRow[i].value !== 0 && nextRow[j].value !== 0) {
      j--;
      let temp = nextRow[j];
      nextRow[j] = nextRow[i];
      nextRow[i] = temp;
      i--;
      hasSwapped = true;
    } else if (nextRow[j].value === 0 && nextRow[i].value !== 0) {
      nextRow[j] = {
        value: nextRow[i].value,
        id: nextRow[i].id,
      };

      nextRow[i] = {
        value: 0,
        id: null,
      };
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

      if (isEqual(state.grid, grid)) {
        return state;
      }

      return {
        ...state,
        grid: grid,
        score: state.score + points,
      };
    }

    case ADD_TILE: {
      const emptyCoordinates = [];

      state.grid.forEach((row, i) => {
        row.forEach((item, j) => {
          if (item.value === 0) {
            emptyCoordinates.push([i, j]);
          }
        });
      });

      if (emptyCoordinates.length === 0) {
        console.log("in empty coordinates.length === 0");

        return state;
      }

      const randomEmptyCoordinateIndex = Math.floor(
        Math.random() * emptyCoordinates.length
      );
      const randomEmptyCoordinate =
        emptyCoordinates[randomEmptyCoordinateIndex];

      const number = randomNumber();

      const tileObject = {
        value: number,
        id: id++,
      };

      const emptyTileObject = {
        value: 0,
        id: null,
      };

      const nextGrid = state.grid.reduce((acc, row, i) => {
        if (i === randomEmptyCoordinate[0]) {
          const newRow = row.reduce((acc, tile, j) => {
            if (j === randomEmptyCoordinate[1]) {
              acc.push(tileObject);
            } else {
              acc.push(tile);
            }
            return acc;
          }, []);
          acc.push(newRow);
        } else {
          acc.push(row);
        }
        return acc;
      }, []);
      console.log(nextGrid);
      return {
        ...state,
        grid: nextGrid,
      };
    }

    default:
      return state;
  }
};

export default boardReducer;
