import { RealBoard } from "./realBoard.model";

export interface PlayerBoard extends RealBoard {
  gameOver: boolean;
}
