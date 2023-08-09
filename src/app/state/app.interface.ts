import { StoreList } from "../utils/store-utils";
import { Settings } from "../models/settings.model";
import { Cell } from "../models/cell.model";

export interface IApp {
  playerBoard: StoreList<Cell[][]>;
  realBoard: StoreList<Cell[][]>;
  settings: Settings;
}

export interface IAppState {
  AppState: IApp;
}
