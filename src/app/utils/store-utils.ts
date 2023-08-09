import { Cell } from "../models/cell.model";
import { Level } from "../models/level.model";
import { Settings } from "../models/settings.model";

export interface StoreList<T> {
  entities: T;
  loading: boolean;
  error: boolean;
}

export const storeListInitialState: StoreList<Cell[][]> = {
  entities: [],
  loading: false,
  error: false,
};

export const settingsInitialState: Settings = {
  level: Level.Easy,
  width: 9,
  height: 9,
  totalMines: 10,
};
