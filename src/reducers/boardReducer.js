import {
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  addTile,
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

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UP":
      const upResult = moveUp(state.grid);
      return {
        ...state,
        upResult,
      };
    case "DOWN":
      const downResult = moveDown(state.grid);
      return {
        ...state,
        downResult,
      };
    case "RIGHT":
      const rightResult = moveRight(state.grid);
      return {
        ...state,
        rightResult,
      };
    case "LEFT":
      const leftResult = moveLeft(state.grid);
      return {
        ...state,
        leftResult,
      };
    case "ADD_TILE":
      const newTile = addTile();
      return {
        ...state,
        newTile,
      };
    case "RESTART":
      return state;
    default:
      return state;
  }
};

export default boardReducer;
