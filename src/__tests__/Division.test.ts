import { init } from "svelte/internal";
import { Board } from "../classes/Board";
import { Cell } from "../classes/Cell";
import type { Division } from "../classes/Division";
import { getCellsFromTemplate, getIndex, getRowFromCells } from "../helpers";

describe("Division", function () {
  let division: Division;

  beforeAll(function () {
    const cells = getCellsFromTemplate([]);
    division = getRowFromCells(cells, 1);
  });

  test("exists", function () {
    expect(division).toBeDefined();
  });

  test(".has checks whether or not a division already has a value", function () {
    expect(division.has(1)).toBe(false);
    expect(division.has(2)).toBe(false);

    {
      const cell = division.cells[0];
      cell.value = 1;
      division.cells[0] = cell;
    }

    expect(division.has(1)).toBe(true);
    expect(division.has(2)).toBe(false);

    {
      const cell = division.cells[0];
      cell.value = 2;
      division.cells[0] = cell;
    }

    expect(division.has(1)).toBe(false);
    expect(division.has(2)).toBe(true);
  });
});
