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

  setCell(row: number, col: number, val: number | null): void {
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

  random(n: number): boolean {
    this.clear();

    const indexes = Array.from(new Array(81)).map((_, i) => i);
    const randomIndexes = _.shuffle(indexes).slice(0, n);
    return this.recRandom(randomIndexes);
  }

  private recRandom(remaining: number[]): boolean {
    const _remaining = [...remaining];
    if (_remaining.length === 0) {
      return true;
    }

    const idx = _remaining.pop();

    const numbers = Array.from(new Array(9)).map((_, i) => i + 1);
    const randomNumbers = _.shuffle(numbers);

    for (let i = 0; i < randomNumbers.length; i++) {
      const randomNumber = randomNumbers[i];
      this.board.setCellByIndex(idx, randomNumber);
      if (this.board.isValid && this.recRandom(_remaining)) {
        return true;
      }
    }

    this.board.setCellByIndex(idx, null);
    return false;
  }

  solve(): boolean {
    const indexes = Array.from(new Array(81)).map((_, i) => i);
    const empty = indexes.filter(
      (i) => this.board.getCellByIndex(i).value === null
    );
    return this.recSolve(empty);
  }

  private recSolve(remaining: number[]): boolean {
    if (remaining.length === 0) {
      return true;
    }

    const _remaining = [...remaining];

    const idx = _remaining.pop();

    const cell = this.board.getCellByIndex(idx);
    const numbers = cell.remaining;

    if (numbers.length === 0) {
      return false;
    }

    for (let i = 0; i < numbers.length; i++) {
      const val = numbers[i];
      this.setCellByIndex(idx, val);
      if (this.recSolve(_remaining)) {
        return true;
      }
    }

    this.setCellByIndex(idx, null);
    return false;
  }
}
