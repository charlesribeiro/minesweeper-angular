import { Cell, MineStatus } from "../models/cell.model";

export const mockCell: Cell = {
  hasMine: false,
  xPos: 0,
  yPos: 0,
  status: MineStatus.Mine,
};
