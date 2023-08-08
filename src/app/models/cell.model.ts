export interface Cell {
  clicked: boolean;
  hasMine: boolean;
  flagged: boolean;
  minesInNeighborhood: MinesInNeighborhood;
}

export enum MinesInNeighborhood {
  None = 0,
}
