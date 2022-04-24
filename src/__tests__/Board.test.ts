import { init } from "svelte/internal";
import { Board } from "../classes/Board";
import { getIndex } from "../helpers";

describe("Board", function () {
  let board: Board;

  beforeAll(function () {
    board = new Board();
  });

  test("exists", function () {
    expect(board).toBeDefined();
  });

  test("getTemplate returns an array of the current board template", function () {
    const initialTemplate = board.getTemplate();
    expect(initialTemplate.every((x) => x === null)).toBe(true);

    board.setCell(1, 1, 3);
    board.setCell(2, 2, 5);

    const updatedTemplate = board.getTemplate();
    expect(updatedTemplate[getIndex(1, 1)]).toBe(3);
    expect(updatedTemplate[getIndex(2, 2)]).toBe(5);
  });

  test("isValid returns whether or not the current configuration is valid", function () {
    board.setCell(0, 0, 1);
    expect(board.isValid).toBe(true);

    board.setCell(0, 8, 1);
    expect(board.isValid).toBe(false);

    board.setCell(0, 8, 2);
    expect(board.isValid).toBe(true);

    board.setCell(1, 1, 1);
    expect(board.isValid).toBe(false);

    board.setCell(1, 1, 2);
    expect(board.isValid).toBe(true);

    board.setCell(8, 0, 1);
    expect(board.isValid).toBe(false);

    board.setCell(8, 0, 2);
    expect(board.isValid).toBe(true);
  });
});
