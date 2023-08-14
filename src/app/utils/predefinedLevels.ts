import { Level } from "../models/level.model";
import { Settings } from "../models/settings.model";

export const predefinedLevels: Settings[] = [
  {
    level: Level.Easy,
    width: 9,
    height: 9,
    totalMines: 9,
  } as Settings,
  {
    level: Level.Medium,
    width: 15,
    height: 15,
    totalMines: 20,
  } as Settings,
  {
    level: Level.Hard,
    width: 20,
    height: 20,
    totalMines: 50,
  } as Settings,
  {
    level: Level.Custom,
    width: 9,
    height: 9,
    totalMines: 9,
  } as Settings,
];
