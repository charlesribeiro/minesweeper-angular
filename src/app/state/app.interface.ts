import { Board } from "src/app/models/board.model";
import { StoreList } from "../utils/store-utils";
import { Settings } from "../models/settings.model";

export interface IApp {
  playerBoard: StoreList<Board>;
  realBoard: StoreList<Board>;
  settings: Settings;
}

export interface IAppState {
  AppState: IApp;
}
