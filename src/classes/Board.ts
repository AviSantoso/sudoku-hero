import {
  getCellsFromTemplate,
  getRowsFromCells,
  getColsFromCells,
  getSubGridsFromCells,
  getIndex,
} from "../helpers";
import autoBind from "auto-bind";
import type { Cell } from "./Cell";
import type { CellValue } from "./CellValue";
import type { Division } from "./Division";

export class Board {
  public isValid: boolean;

  private cells: Cell[];
  private rows: Division[];
  private cols: Division[];
  private subGrids: Division[];

  constructor(template: CellValue[] = null) {
    this.setTemplate(template);
    autoBind(this);
  }

  setTemplate(template: CellValue[]) {
    this.cells = getCellsFromTemplate(template);
    this.rows = getRowsFromCells(this.cells);
    this.cols = getColsFromCells(this.cells);
    this.subGrids = getSubGridsFromCells(this.cells);
    this.rows.forEach((row) => row.init());
    this.cols.forEach((col) => col.init());
    this.subGrids.forEach((sg) => sg.init());
  }

  getTemplate() {
    return this.cells.map((x) => x.value);
  }

  getCell(row: number, col: number): Cell {
    return this.cells[getIndex(row, col)];
  }

  setCell(row: number, col: number, value: number): void {
    const index = getIndex(row, col);
    const cell = this.cells[index];

    this.cells[index].value = value;

    const rowDiv = this.getRow(cell.row);
    const colDiv = this.getCol(cell.col);
    const sgDiv = this.getSubGrid(cell.subGrid);

    rowDiv.updateIsValid();
    colDiv.updateIsValid();
    sgDiv.updateIsValid();

    if (!rowDiv.isValid || !colDiv.isValid || !sgDiv.isValid) {
      this.isValid = false;
    } else {
      this.refreshIsValid();
    }
  }

  getRow(row: number) {
    return this.rows[row];
  }

  getCol(col: number) {
    return this.cols[col];
  }

  getSubGrid(sg: number) {
    return this.subGrids[sg];
  }

  private refreshIsValid() {
    for (let i = 0; i < 9; i++) {
      if (
        !this.getRow(i).isValid ||
        !this.getCol(i).isValid ||
        !this.getSubGrid(i).isValid
      ) {
        this.isValid = false;
        return;
      }
    }
    this.isValid = true;
  }
}