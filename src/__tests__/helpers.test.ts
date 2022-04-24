import { createCell } from "../helpers";

test("createCell creates cells with the right row", () => {
  const firstCell = createCell(0);
  expect(firstCell.row).toBe(0);

  const secondCell = createCell(9);
  expect(secondCell.row).toBe(1);

  const thirdCell = createCell(80);
  expect(thirdCell.row).toBe(8);

  const tooBig = createCell(81);
  expect(tooBig).toBeNull();

  const tooSmall = createCell(-1);
  expect(tooSmall).toBeNull();
});

test("createCell creates cells with the right column", () => {
  const firstCell = createCell(0);
  expect(firstCell.col).toBe(0);

  const secondCell = createCell(1);
  expect(secondCell.col).toBe(1);

  const thirdCell = createCell(80);
  expect(thirdCell.col).toBe(8);

  const tooBig = createCell(81);
  expect(tooBig).toBeNull();

  const tooSmall = createCell(-1);
  expect(tooSmall).toBeNull();
});

test("createCell creates cells with the right subGrid", () => {
  const firstCell = createCell(0);
  expect(firstCell.subGrid).toBe(0);

  const secondCell = createCell(8);
  expect(secondCell.subGrid).toBe(2);

  const thirdCell = createCell(80);
  expect(thirdCell.subGrid).toBe(8);

  const tooBig = createCell(81);
  expect(tooBig).toBeNull();

  const tooSmall = createCell(-1);
  expect(tooSmall).toBeNull();
});
