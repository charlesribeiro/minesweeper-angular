import { Settings } from "../models/settings.model";
import { PlayerBoard } from "../models/playerBoard.model";
import { RealBoard } from "../models/realBoard.model";
import { PlayerSession } from "../models/session.model";

export interface IApp {
  playerBoard: PlayerBoard;
  realBoard: RealBoard;
  settings: Settings;
  playerSession: PlayerSession;
}

export interface IAppState {
  AppState: IApp;
}
