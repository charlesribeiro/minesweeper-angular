import { Board } from "../models/board.model";
import { Level } from "../models/level.model";
import { Settings } from "../models/settings.model";

// import { CharData } from "../app/models/characterData.interface";
export interface StoreList<T> {
  entities: T[];
  loading: boolean;
  error: boolean;
}

export const storeListInitialState: StoreList<Board> = {
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
