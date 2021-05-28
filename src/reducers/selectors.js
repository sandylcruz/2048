import { createSelector } from "reselect";

export const selectGrid = createSelector(
  (state) => state.board.grid,
  (grid) => grid
);
