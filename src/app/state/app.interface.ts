import { Settings } from "../models/settings.model";
import { PlayerBoard } from "../models/playerBoard.model";
import { RealBoard } from "../models/realBoard.model";

export interface IApp {
  playerBoard: PlayerBoard;
  realBoard: RealBoard;
  settings: Settings;
}

export interface IAppState {
  AppState: IApp;
}
