import { Cell, MineStatus, MinesInNeighborhood } from "../models/cell.model";

export const mockCell: Cell = {
  clicked: false,
  hasMine: false,
  minesInNeighborhood: MinesInNeighborhood.None,
  flagged: false,
  xPos: 0,
  yPos: 0,
  status: MineStatus.Mine,
};
