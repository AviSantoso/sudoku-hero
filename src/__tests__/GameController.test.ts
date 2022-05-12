import { Board } from "../classes/Board";
import { GameController } from "../classes/GameController";

describe("GameController", function () {
  let board: Board;
  let gc: GameController;

  beforeEach(function () {
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

    gc.random(1);

    {
      const values = board.getTemplate();
      expect(values.filter((x) => x !== null).length).toBe(1);
      expect(board.isValid).toBe(true);
    }

    gc.random(10);

    {
      const values = board.getTemplate();
      expect(values.filter((x) => x !== null).length).toBe(10);
      expect(board.isValid).toBe(true);
    }
  });

  test("can save and load the configuration of the board to a string", function () {
    board.setCell(1, 5, 3);
    expect(board.getCell(1, 5).value).toBe(3);

    const saved = board.save();
    expect(saved.length).toBeGreaterThan(0);

    gc.clear();
    expect(board.getCell(1, 5).value).toBe(null);

    board.load(saved);

    expect(board.getCell(1, 5).value).toBe(3);
  });

  test("can solve to finish the rest of the board", function () {
    gc.random(30);

    {
      const template = board.getTemplate();
      expect(template.filter((x) => x !== null).length).toBe(30);
      expect(board.isValid).toBe(true);
    }

    gc.solve();

    {
      const template = board.getTemplate();
      expect(template.filter((x) => x !== null).length).toBe(81);
      expect(board.isValid).toBe(true);
    }
  });
});
