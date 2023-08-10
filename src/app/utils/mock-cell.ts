import { Cell, MineStatus } from "../models/cell.model";

export const mockCell: Cell = {
  hasMine: true,
  xPos: 0,
  yPos: 0,
  status: MineStatus.Mine,
};

export const mockCellWithoutMine: Cell = {
  hasMine: false,
  xPos: 0,
  yPos: 0,
  status: MineStatus.Pristine,
};
