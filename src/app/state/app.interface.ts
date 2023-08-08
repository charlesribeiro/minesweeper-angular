import { Board } from "src/app/models/board.model";
import { Level } from "../models/level.model";
import { StoreList } from "../utils/store-utils";

export interface IApp {
  playerBoard: StoreList<Board>;
  realBoard: StoreList<Board>;
  level: Level;
}

export interface IAppState {
  AppState: IApp;
}
