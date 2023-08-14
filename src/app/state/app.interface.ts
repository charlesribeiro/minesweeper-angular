import { Settings } from "../models/settings.model";
import { PlayerBoard } from "../models/playerBoard.model";
import { PlayerSession } from "../models/session.model";

export interface IApp {
  playerBoard: PlayerBoard;
  playerSession: PlayerSession;
}

export interface IAppState {
  AppState: IApp;
  Settings: Settings;
}
