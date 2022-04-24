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
  value: CellValue;

  rowDiv: Division | null;
  colDiv: Division | null;
  sgDiv: Division | null;

  constructor(cell: ICell) {
    this.row = cell.row;
    this.col = cell.col;
    this.subGrid = cell.subGrid;
    this.value = cell.value;

    this.rowDiv = null;
    this.colDiv = null;
    this.sgDiv = null;
  }
}
