import type { Board } from "./Board";
import _ from "lodash";
import { getRowColumn } from "../helpers";

export class GameController {
  constructor(private board: Board) {}

  clear() {
    this.board.setTemplate([]);
  }

  random(n: number): boolean {
    this.clear();

    const indexes = Array.from(new Array(81)).map((_, i) => i);
    const randomIndexes = _.shuffle(indexes).slice(0, n);
    return this.internalRandom(randomIndexes);
  }

  private internalRandom(remaining: number[]): boolean {
    const newRemaining = [...remaining];
    if (newRemaining.length === 0) {
      return true;
    }

    const currentIndex = newRemaining.pop();
    const [row, column] = getRowColumn(currentIndex);

    const numbers = Array.from(new Array(9)).map((_, i) => i + 1);
    const randomNumbers = _.shuffle(numbers);

    for (let i = 0; i < randomNumbers.length; i++) {
      const randomNumber = randomNumbers[i];
      this.board.setCell(row, column, randomNumber);
      if (this.board.isValid && this.internalRandom(newRemaining)) {
        return true;
      }
    }

    return false;
  }
}
