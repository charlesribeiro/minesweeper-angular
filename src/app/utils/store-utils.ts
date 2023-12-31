import { GameStatus } from "../models/gameStatus.model";
import { Level } from "../models/level.model";
import { PlayerBoard } from "../models/playerBoard.model";
import { PlayerSession } from "../models/session.model";
import { SessionTypes } from "../models/sessionTypes";
import { Settings } from "../models/settings.model";

export const playerBoardInitialState: PlayerBoard = {
  entities: [],
  loading: false,
  error: false,
  gameStatus: GameStatus.NOT_PLAYING,
};

export const settingsInitialState: Settings = {
  level: Level.Easy,
  width: 9,
  height: 9,
  totalMines: 3,
};

export const sessionInitialState: PlayerSession = {
  type: SessionTypes.newGame,
};
