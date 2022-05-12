import type { CellValue } from "./CellValue";
import type { Division } from "./Division";

interface ICell {
  row: number;
  col: number;
  subGrid: number;
  value: CellValue;
}

export class Cell implements ICell {
  row: number;
  col: number;
  subGrid: number;
  remaining: number[];

  rowDiv: Division | null;
  colDiv: Division | null;
  sgDiv: Division | null;

  private _value: CellValue;

  constructor(cell: ICell) {
    this.row = cell.row;
    this.col = cell.col;
    this.subGrid = cell.subGrid;
    this.value = cell.value;

    this.remaining = Array.from(new Array(9)).map((_, i) => i + 1);

    this.rowDiv = null;
    this.colDiv = null;
    this.sgDiv = null;
  }

  toString(): string {
    return "" + (this.value ?? "-");
  }

  public get value(): CellValue {
    return this._value;
  }

  public set value(value: CellValue) {
    if (value !== null && (value <= 0 || value >= 10)) {
      throw new Error("Value out of bounds for Sudoku.");
    }
    this._value = value;
  }

  update() {
    const remaining = [];
    for (let i = 0; i < 9; i++) {
      const v = i + 1;
      if (!(this.rowDiv?.has(v) || this.colDiv?.has(v) || this.sgDiv?.has(v))) {
        remaining.push(v);
      }
    }
    this.remaining = remaining;
  }
}
