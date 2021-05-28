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

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default boardReducer;
