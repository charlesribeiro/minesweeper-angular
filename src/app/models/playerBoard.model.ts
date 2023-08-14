import { Cell } from "./cell.model";
import { GameStatus } from "./gameStatus.model";

export interface PlayerBoard {
  gameStatus: GameStatus;
  entities: Cell[][];
  loading: boolean;
  error: boolean;
}
