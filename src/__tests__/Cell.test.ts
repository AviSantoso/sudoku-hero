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

  test("must set a valid value or null", function () {
    expect(cell.value).toBe(null);

    expect(() => {
      cell.value = 0;
    }).toThrow();

    expect(() => {
      cell.value = 1;
    }).not.toThrow();

    expect(() => {
      cell.value = 10;
    }).toThrow();

    expect(() => {
      cell.value = 9;
    }).not.toThrow();
  });

  test("should return the number when toString is used, and a dash when it is null.", function () {
    cell.value = 1;

    expect(cell.toString()).toBe("1");

    cell.value = 5;

    expect(cell.toString()).toBe("5");

    cell.value = null;

    expect(cell.toString()).toBe("-");
  });
});
