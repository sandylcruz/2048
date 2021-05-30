import { createSelector } from "reselect";

export const selectGrid = createSelector(
  (state) => state.board.grid,
  (grid) => grid
);

export const selectPoints = createSelector(
  (state) => state.board.score,
  (score) => score
);
