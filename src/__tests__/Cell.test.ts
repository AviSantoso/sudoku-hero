import { Board } from "../classes/Board";
import type { Cell } from "../classes/Cell";
import type { Division } from "../classes/Division";

describe("Cell", function () {
  let board: Board;
  let cell: Cell;

  beforeEach(function () {
    board = new Board([]);
    cell = board.getCellByIndex(0);
  });

  test("exists", function () {
    expect(cell).toBeDefined();
  });

  test("remaining returns a list of possible remaining values", function () {
    expect(cell.remaining.length).toBe(9);

    board.setCellByIndex(1, 1);

    expect(cell.remaining.length).toBe(8);

    for (let i = 1; i < 9; i++) {
      board.setCellByIndex(i, i);
    }

    expect(cell.remaining.length).toBe(1);
    expect(cell.remaining[0]).toBe(9);
  });
});
