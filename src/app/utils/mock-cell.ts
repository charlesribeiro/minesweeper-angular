import { Cell, MineStatus } from "../models/cell.model";

export const mockCell: Cell = {
  hasMine: true,
  xPos: 0,
  yPos: 0,
  status: MineStatus.Mine,
};

export const mockPristineCellWithoutMine: Cell = {
  hasMine: false,
  xPos: 0,
  yPos: 0,
  status: MineStatus.Pristine,
};

export const mockCellWith1MineNeighbor: Cell = {
  hasMine: false,
  xPos: 0,
  yPos: 0,
  status: MineStatus.Neighbor1,
};

export const mockCellWithFlag: Cell = {
  hasMine: false,
  xPos: 0,
  yPos: 0,
  status: MineStatus.Flagged,
};
