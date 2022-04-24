import { Board } from "../classes/Board";
import { GameController } from "../classes/GameController";

describe("GameController", function () {
  let board: Board;
  let gc: GameController;

  beforeAll(function () {
    board = new Board();
    gc = new GameController(board);
  });

  test("exists", function () {
    expect(gc).toBeDefined();
  });

  test("can clear the board.", function () {
    board.setCell(1, 5, 3);
    expect(board.getCell(1, 5).value).toBe(3);

    gc.clear();
    expect(board.getCell(1, 5).value).toBe(null);
  });

  test("can create a random board configuration.", function () {
    {
      const values = board.getTemplate();
      expect(values.every((x) => x === null)).toBe(true);
    }

    expect(gc.random(1)).toBe(true);

    {
      const values = board.getTemplate();
      expect(values.filter((x) => x !== null).length).toBe(1);
      expect(board.isValid).toBe(true);
    }

    expect(gc.random(10)).toBe(true);

    {
      const values = board.getTemplate();
      expect(values.filter((x) => x !== null).length).toBe(10);
      expect(board.isValid).toBe(true);
    }
  });
});