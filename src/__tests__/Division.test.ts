import { Board } from "../classes/Board";
import type { Division } from "../classes/Division";

describe("Division", function () {
  let board: Board;
  let division: Division;

  beforeEach(function () {
    board = new Board([]);
    division = board.getRow(0);
  });

  test("exists", function () {
    expect(division).toBeDefined();
  });

  test(".has checks whether or not a division already has a value", function () {
    expect(division.has(1)).toBe(false);
    expect(division.has(2)).toBe(false);

    board.setCellByIndex(0, 1);

    expect(division.has(1)).toBe(true);
    expect(division.has(2)).toBe(false);

    board.setCellByIndex(0, 2);

    expect(division.has(1)).toBe(false);
    expect(division.has(2)).toBe(true);
  });

  test(".remaining gets a list of numbers that are remaining", function () {
    expect(division.remaining.length).toBe(9);

    board.setCellByIndex(0, 1);

    expect(division.remaining.length).toBe(8);
    expect(division.remaining.includes(1)).toBe(false);

    for (let i = 0; i < 9; i++) {
      board.setCellByIndex(i, i + 1);
    }

    expect(division.remaining.length).toBe(0);
  });
});
