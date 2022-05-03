import type { Cell } from "./Cell";

interface IDivision {
  type: "Row" | "Col" | "SubGrid";
  cells: Cell[];
}

export class Division implements IDivision {
  type: "Row" | "Col" | "SubGrid";
  cells: Cell[];
  isValid: boolean;
  remaining: number[];

  constructor(division: IDivision) {
    this.type = division.type;
    this.cells = division.cells;
    this.isValid = true;
    this.remaining = Array.from(new Array(9)).map((_, i) => i + 1);
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

  update() {
    this.updateRemaining();
    this.updateIsValid();
    this.cells.forEach((c) => c.update());
  }

  updateRemaining() {
    const existing = new Set();
    for (let i = 0; i < this.cells.length; i++) {
      const cell = this.cells[i];
      if (!cell.value) {
        continue;
      }

      existing.add(cell.value);
    }
    const remaining = [];
    for (let i = 0; i < 9; i++) {
      if (!existing.has(i + 1)) {
        remaining.push(i + 1);
      }
    }
    this.remaining = remaining;
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
