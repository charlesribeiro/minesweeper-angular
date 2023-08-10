import { CellPosition } from "../models/cellPosition.model";

export const neighborOffsets: CellPosition[] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, 1],
  [-1, -1],
  [1, 1],
  [1, -1],
];
