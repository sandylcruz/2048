// new tile, mergeTiles(), move tiles(direction)
// startGame(), setGame()

// generateRandomTile, moveup, moveleft, moveright, movedown

export const moveUp = (board) => {};

export const moveDown = (board) => {};

export const moveRight = (row) => {
  const nonZeroNumbers = [];
  const zeros = [];

  for (let i = 0; i < row.length; i++) {
    if (row[i] !== 0) {
      nonZeroNumbers.push(row[i]);
    } else {
      zeros.push(row[i]);
    }
  }

  const newRow = nonZeroNumbers.unshift(zeros);
  return newRow;
};

export const moveLeft = (row) => {
  const nonZeroNumbers = [];
  const zeros = [];

  for (let i = 0; i < row.length; i++) {
    if (row[i] !== 0) {
      nonZeroNumbers.push(row[i]);
    } else {
      zeros.push(row[i]);
    }
  }

  const newRow = nonZeroNumbers.concat(zeros);
  return newRow;
};

export const addTile = (board) => {
  // generate coordinate pair && make sure it's empty
  // place tile on board
};
