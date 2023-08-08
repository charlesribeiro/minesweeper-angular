import { Level } from "./level.model";

export interface Settings {
  level: Level;
  width: Number;
  height: Number;
  totalMines: Number;
}
