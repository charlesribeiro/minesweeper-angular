import { GameStatus } from "./gameStatus.model";
import { RealBoard } from "./realBoard.model";

export interface PlayerBoard extends RealBoard {
  gameStatus: GameStatus;
  flagsLeft: number;
}
