import { Cell } from "../models/cell.model";

export function fisherYatesShuffle(
  cells: Cell[],
  height: number,
  width: number,
): Cell[] {
  for (let i = height * width - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return cells;
}
