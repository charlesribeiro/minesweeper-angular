import { Cell } from "../models/cell.model";
import { mockCell, mockCellWithoutMine } from "./mock-cell";

export const mockBoard: Cell[][] = [
  [mockCell, mockCell],
  [mockCell, mockCell],
];

export const mock3x3BoardWith8Mines: Cell[][] = [
  [mockCell, mockCell, mockCell],
  [mockCell, mockCellWithoutMine, mockCell],
  [mockCell, mockCell, mockCell],
];

export const mock3x3BoardWith0Mines: Cell[][] = [
  [mockCellWithoutMine, mockCellWithoutMine, mockCellWithoutMine],
  [mockCellWithoutMine, mockCellWithoutMine, mockCellWithoutMine],
  [mockCellWithoutMine, mockCellWithoutMine, mockCellWithoutMine],
];
