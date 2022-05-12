import autoBind from "auto-bind";

import {
  getCellsFromTemplate,
  getColsFromCells,
  getIndex,
  getRowsFromCells,
  getSubGridsFromCells,
} from "../helpers";

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

  toString(): string {
    return this.rows.map((x) => x.toString()).join("\n");
  }

  getTemplate() {
    return this.cells.map((x) => x.value);
  }

  getCell(row: number, col: number): Cell {
    return this.cells[getIndex(row, col)];
  }

  getCellByIndex(index: number) {
    return this.cells[index];
  }

  setCell(row: number, col: number, value: number | null): void {
    const index = getIndex(row, col);
    return this.setCellByIndex(index, value);
  }

  setCellByIndex(index: number, value: number | null) {
    const cell = this.cells[index];

    this.cells[index].value = value;

    const rowDiv = this.getRow(cell.row);
    const colDiv = this.getCol(cell.col);
    const sgDiv = this.getSubGrid(cell.subGrid);

    rowDiv.update();
    colDiv.update();
    sgDiv.update();

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

  save(): string {
    const template = this.getTemplate();
    const str = template.reduce((s, x) => (s += (x ?? 0).toString()), "");
    return str;
  }

  load(str: string) {
    const template = str
      .split("")
      .map((x) => parseInt(x))
      .map((x) => (x === 0 ? null : x));
    this.setTemplate(template);
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
