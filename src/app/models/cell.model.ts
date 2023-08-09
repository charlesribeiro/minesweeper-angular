export interface Cell {
  clicked: boolean;
  hasMine: boolean;
  flagged: boolean;
  minesInNeighborhood: MinesInNeighborhood;
  xPos: number;
  yPos: number;
  status: MineStatus;
}

export enum MinesInNeighborhood {
  None = 0,
}

export enum MineStatus {
  Pristine = "X",
  None = "0",
  Neighbor1 = "1",
  Neighbor2 = "2",
  Neighbor3 = "3",
  Neighbor4 = "4",
  Neighbor5 = "5",
  Neighbor6 = "6",
  Neighbor7 = "7",
  Neighbor8 = "8",
  Mine = "M",
  Flagged = "F",
}
