import boardReducer from "../boardReducer";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
} from "../../actions/boardActions";

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
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 2],
            [0, 0, 2, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_LEFT,
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

      it("doesn't combine non-like numbers", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 0],
            [0, 2, 0, 0],
            [4, 0, 0, 2],
            [0, 0, 2, 4],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_LEFT,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [2, 4, 0, 0],
            [2, 0, 0, 0],
            [4, 2, 0, 0],
            [2, 4, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("doesn't combine 3 non-like numbers", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 2],
            [0, 2, 0, 0],
            [4, 0, 0, 2],
            [0, 0, 2, 4],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_LEFT,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [2, 4, 2, 0],
            [2, 0, 0, 0],
            [4, 2, 0, 0],
            [2, 4, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("updates the score", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 2],
            [0, 0, 2, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_LEFT,
        });

        expect(result).toEqual({
          score: 4,
          grid: [
            [4, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("handles empty rows", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 0],
            [0, 2, 0, 0],
            [4, 0, 0, 2],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_LEFT,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [2, 4, 0, 0],
            [2, 0, 0, 0],
            [4, 2, 0, 0],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("handles cases where non-zero number is far left", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 0],
            [0, 2, 0, 0],
            [4, 0, 0, 2],
            [2, 0, 0, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_LEFT,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [2, 4, 0, 0],
            [2, 0, 0, 0],
            [4, 2, 0, 0],
            [2, 0, 0, 0],
          ],
          bestScore: null,
        });
      });
    });

    describe("when moving right", () => {
      it("moves tiles to the correct right place", () => {
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
          type: MOVE_RIGHT,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
          ],
          bestScore: null,
        });
      });

      it("doesn't combine non-like numbers", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 0],
            [0, 2, 0, 0],
            [4, 0, 0, 2],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_RIGHT,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [0, 0, 2, 4],
            [0, 0, 0, 2],
            [0, 0, 4, 2],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("handles cases where the non-zero number is far right already", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 0],
            [0, 2, 0, 0],
            [4, 0, 0, 2],
            [0, 0, 0, 2],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_RIGHT,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [0, 0, 2, 4],
            [0, 0, 0, 2],
            [0, 0, 4, 2],
            [0, 0, 0, 2],
          ],
          bestScore: null,
        });
      });

      it("doesn't combine 3 non-like numbers", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 2],
            [0, 2, 0, 0],
            [4, 0, 0, 2],
            [0, 0, 2, 4],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_RIGHT,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [0, 2, 4, 2],
            [0, 0, 0, 2],
            [0, 0, 4, 2],
            [0, 0, 2, 4],
          ],
          bestScore: null,
        });
      });

      it("updates the score", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 2],
            [0, 0, 2, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_RIGHT,
        });

        expect(result).toEqual({
          score: 4,
          grid: [
            [0, 0, 0, 4],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
            [0, 0, 0, 2],
          ],
          bestScore: null,
        });
      });
    });

    describe("when moving up", () => {
      it("moves tiles to the correct place at the top", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 0, 0, 2],
            [0, 0, 2, 0],
            [0, 2, 0, 0],
            [2, 0, 0, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_UP,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("doesn't combine non-like numbers", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 2, 0],
            [0, 4, 0, 0],
            [2, 0, 0, 2],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_UP,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [2, 2, 2, 2],
            [0, 4, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("handles cases where the non-zero number is at the top already", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 0],
            [0, 2, 0, 0],
            [4, 0, 0, 2],
            [0, 0, 0, 2],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_UP,
        });

        expect(result).toEqual({
          score: 8,
          grid: [
            [4, 4, 4, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("doesn't combine 3 non-like numbers", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 2],
            [0, 2, 0, 4],
            [4, 0, 0, 0],
            [0, 0, 0, 2],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_UP,
        });

        expect(result).toEqual({
          score: 4,
          grid: [
            [4, 4, 4, 2],
            [0, 0, 0, 4],
            [0, 0, 0, 2],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("updates the score", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 2],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_UP,
        });

        expect(result).toEqual({
          score: 4,
          grid: [
            [0, 4, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        });
      });
    });

    describe("when moving down", () => {
      it("moves tiles to the correct place", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 0, 2, 0],
            [0, 2, 0, 2],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_DOWN,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 2, 2, 2],
          ],
          bestScore: null,
        });
      });

      it("doesn't combine non-like numbers", () => {
        const mockState = {
          score: 0,
          grid: [
            [2, 0, 0, 0],
            [0, 2, 0, 0],
            [0, 4, 0, 2],
            [0, 0, 2, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_DOWN,
        });

        expect(result).toEqual({
          score: 0,
          grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 2, 0, 0],
            [2, 4, 2, 2],
          ],
          bestScore: null,
        });
      });

      it("handles cases where the non-zero number is at the bottom already", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 0],
            [0, 2, 0, 0],
            [4, 0, 0, 2],
            [0, 0, 0, 2],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_DOWN,
        });

        expect(result).toEqual({
          score: 8,
          grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [4, 4, 4, 4],
          ],
          bestScore: null,
        });
      });

      it("doesn't combine 3 non-like numbers", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 4, 2],
            [0, 2, 0, 4],
            [4, 0, 0, 0],
            [0, 0, 0, 2],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_DOWN,
        });

        expect(result).toEqual({
          score: 4,
          grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 2],
            [0, 0, 0, 4],
            [4, 4, 4, 2],
          ],
          bestScore: null,
        });
      });

      it("handles cases where there is a zero between two like numbers", () => {
        const mockState = {
          score: 0,
          grid: [
            [4, 0, 4, 0],
            [0, 4, 0, 4],
            [4, 0, 4, 0],
            [0, 4, 0, 4],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_DOWN,
        });

        expect(result).toEqual({
          score: 32,
          grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [8, 8, 8, 8],
          ],
          bestScore: null,
        });
      });

      fit("handles cases where there are 3 like numbers next to each other", () => {
        const mockState = {
          score: 0,
          grid: [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_DOWN,
        });

        expect(result).toEqual({
          score: 4,
          grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [2, 0, 0, 0],
            [4, 0, 0, 0],
          ],
          bestScore: null,
        });
      });

      it("updates the score", () => {
        const mockState = {
          score: 0,
          grid: [
            [0, 2, 2, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 2],
            [0, 0, 0, 0],
          ],
          bestScore: null,
        };

        const result = boardReducer(mockState, {
          type: MOVE_DOWN,
        });

        expect(result).toEqual({
          score: 4,
          grid: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 4, 2, 2],
          ],
          bestScore: null,
        });
      });
    });
  });
});

// numbers merge correctly when moves are made, numbers dont merge when the shouldn't for every single movement types
