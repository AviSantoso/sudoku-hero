import type { Cell } from "./Cell";

interface IDivision {
  type: "Row" | "Col" | "SubGrid";
  cells: Cell[];
}

export class Division implements IDivision {
  type: "Row" | "Col" | "SubGrid";
  cells: Cell[];
  isValid: boolean;

  constructor(division: IDivision) {
    this.type = division.type;
    this.cells = division.cells;
    this.isValid = true;
  }

  init() {
    switch (this.type) {
      case "Col":
        this.cells.forEach((cell) => (cell.colDiv = this));
        break;
      case "Row":
        this.cells.forEach((cell) => (cell.rowDiv = this));
        break;
      case "SubGrid":
        this.cells.forEach((cell) => (cell.sgDiv = this));
        break;
    }
  }

  has(n: number) {
    return this.cells.some((x) => x.value === n);
  }

  print() {
    console.log(this.cells.map((x) => x.value).join(", "));
  }

  updateIsValid() {
    const existing = new Set();
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      if (!cell.value) {
        continue;
      }

      if (existing.has(cell.value)) {
        this.isValid = false;
        return;
      }
      existing.add(cell.value);
    }
    this.isValid = true;
  }
}
