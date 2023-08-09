import { Level } from "./level.model";

export interface Settings {
  level: Level;
  width: number;
  height: number;
  totalMines: number;
}
