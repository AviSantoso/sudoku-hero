import { Cell } from "./classes/Cell";
import type { CellValue } from "./classes/CellValue";
import { Division } from "./classes/Division";

export function createCell(i: number, value: CellValue = null): Cell | null {
  if (i < 0 || i >= 81) {
    return null;
  }

  const row = Math.floor(i / 9);
  const col = i % 9;
  const sgRow = Math.floor(row / 3);
  const sgCol = Math.floor(col / 3);
  const subGrid = sgRow * 3 + sgCol;

  return new Cell({
    row: row,
    col: col,
    subGrid: subGrid,
    value: value,
  });
}

export function getCellsFromTemplate(template: CellValue[] = null) {
  let cells = [];
  if (!template || template.length !== 81) {
    cells = Array.from(new Array(81)).map((_, i) => createCell(i));
  } else {
    cells = template.map((value, i) => createCell(i, value));
  }
  return cells;
}

export function getRowFromCells(_cells: Cell[], row: number): Division {
  const cells: Cell[] = [];
  for (let col = 0; col < 9; col++) {
    cells.push(_cells[getIndex(row, col)]);
  }
  return new Division({ type: "Row", cells });
}

export function getColFromCells(_cells: Cell[], col: number): Division {
  const cells: Cell[] = [];
  for (let row = 0; row < 9; row++) {
    cells.push(_cells[getIndex(row, col)]);
  }
  return new Division({ type: "Col", cells });
}

export function getSubGridFromCells(_cells: Cell[], subGrid: number): Division {
  const cells: Cell[] = [];
  const sgRow = Math.floor(subGrid / 3);
  const sgCol = subGrid % 3;

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      cells.push(_cells[getIndex(sgRow * 3 + row, sgCol * 3 + col)]);
    }
  }

  return new Division({ type: "SubGrid", cells });
}

export function getRowsFromCells(cells: Cell[]): Division[] {
  const rows: Division[] = [];
  for (let row = 0; row < 9; row++) {
    rows.push(getRowFromCells(cells, row));
  }
  return rows;
}

export function getColsFromCells(cells: Cell[]): Division[] {
  const cols: Division[] = [];
  for (let col = 0; col < 9; col++) {
    cols.push(getColFromCells(cells, col));
  }
  return cols;
}

export function getSubGridsFromCells(cells: Cell[]): Division[] {
  const subGrids: Division[] = [];
  for (let sg = 0; sg < 9; sg++) {
    subGrids.push(getSubGridFromCells(cells, sg));
  }
  return subGrids;
}

export function getIndex(row: number, col: number) {
  return row * 9 + col;
}

export function getRowColumn(index: number) {
  const row = Math.floor(index / 9);
  const col = index % 9;
  return [row, col];
}
