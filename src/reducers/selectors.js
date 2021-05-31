import { createSelector } from "reselect";

export const selectGrid = createSelector(
  (state) => state.board.grid,
  (grid) => grid
);

export const selectPoints = createSelector(
  (state) => state.board.score,
  (score) => score
);

const getNeighborCoordinates = ([i, j], maxSize) => {
  const naiveNeighbors = [
    [i - 1, j],
    [i + 1, j],
    [i, j - 1],
    [i, j + 1],
  ];

  return naiveNeighbors.filter(
    ([i, j]) => i >= 0 && j >= 0 && i < maxSize && j < maxSize
  );
};

export const selectCurrentGameState = createSelector(
  (state) => state.board.grid,
  (grid) => {
    const isWon = grid.some((row) => {
      return row.some((tile) => tile.value === 2048);
    });

    if (isWon) return "won";

    const hasEmptyTile = grid.some((row) => {
      return row.some((tile) => tile.value === 0);
    });

    if (hasEmptyTile) return "active";

    const hasMovesLeft = grid.some((row, i) => {
      return row.some((tile, j) => {
        const neighborCoordinates = getNeighborCoordinates([i, j], grid.length);

        return neighborCoordinates.some((coordinate) => {
          const [x, y] = coordinate;
          const neighborValue = grid[x][y].value;

          return neighborValue === tile.value;
        });
      });
    });

    return hasMovesLeft ? "active" : "lost";
  }
);
