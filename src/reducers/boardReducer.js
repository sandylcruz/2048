const newBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const initialState = {
  board: newBoard,
  score: 0,
  bestScore: null,
  boardHasChanged: true,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default boardReducer;
