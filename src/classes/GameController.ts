import autoBind from "auto-bind";
import _ from "lodash";

import type { Board } from "./Board";

export class GameController {
  numMoves: number;

  constructor(private board: Board) {
    this.numMoves = 0;
    autoBind(this);
  }

  clear() {
    this.board.setTemplate([]);
    this.numMoves = 0;
  }

  setCell(row: number, col: number, val: number | null) {
    if (val !== null) {
      this.numMoves++;
    }
    this.board.setCell(row, col, val);
  }

  setCellByIndex(idx: number, val: number | null) {
    if (val !== null) {
      this.numMoves++;
    }
    this.board.setCellByIndex(idx, val);
  }

  random(n: number): void {
    this.clear();
    this.solve();

    if (!this.board.isValid) {
      throw new Error(
        "Random generator failed to create a valid board configuration."
      );
    }

    const indexes = Array.from(new Array(81)).map((_, i) => i);
    const randomIndexes = _.shuffle(indexes).slice(0, 81 - n);

    for (let i = 0; i < randomIndexes.length; i++) {
      const idx = randomIndexes[i];
      this.setCellByIndex(idx, null);
    }

    this.numMoves = 0;
  }

  solve(): void {
    const indexes = Array.from(new Array(81)).map((_, i) => i);
    const empty = indexes.filter(
      (i) => this.board.getCellByIndex(i).value === null
    );
    if (!this._solve(empty)) {
      throw new Error(
        `Failed to solve the current board configuration.\n${this.board.toString()}`
      );
    }
  }

  private _solve(remaining: number[]): boolean {
    if (this.numMoves >= 1e5) {
      throw new Error(`Number of moves has exceeded ${1e5}.`);
    }

    if (remaining.length === 0) {
      return true;
    }

    const idx = remaining[0];
    const _remaining = remaining.slice(1);

    const cell = this.board.getCellByIndex(idx);
    const numbers = cell.remaining;

    if (numbers.length === 0) {
      return false;
    }

    for (let i = 0; i < numbers.length; i++) {
      const val = numbers[i];
      this.setCellByIndex(idx, val);
      if (this.board.isValid && this._solve(_remaining)) {
        return true;
      }
    }

    this.setCellByIndex(idx, null);
    return false;
  }
}
