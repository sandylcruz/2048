import boardReducer from "../boardReducer";

describe("board reducer", () => {
  it("has the correct initial state", () => {
    const state = boardReducer(undefined, { type: "mockAction " });
    expect(state).toEqual({
      score: 0,
      bestScore: null,
      grid: expect.any(Array),
    });

    const numbers = state.grid.reduce((accumulator, row) => {
      const nonZeros = row.filter((tile) => tile !== 0);
      accumulator.push(...nonZeros);
      return accumulator;
    }, []);

    const zeros = state.grid.reduce((accumulator, row) => {
      const zerosForRow = row.filter((tile) => tile === 0);
      accumulator.push(...zerosForRow);

      return accumulator;
    }, []);

    expect(numbers).toHaveLength(2);
    expect(zeros).toHaveLength(14);

    const twosOrFours = numbers.filter((number) => {
      return number === 2 || number === 4;
    });
    expect(twosOrFours).toHaveLength(2);
  });

  describe("movement transitions", () => {
    describe("when moving left", () => {
      it("moves tiles to the correct place", () => {
        const mockState = {
          score: 0,
          grid: [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 2],
            [0, 0, 2, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: "moveLeft",
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
          ],
          bestScore: null,
        });
      });
    });
  });
});

// numbers merge correctly when moves are made, numbers dont merge when the shouldn't for every single movement types
