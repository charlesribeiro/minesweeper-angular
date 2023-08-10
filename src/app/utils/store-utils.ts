import { GameStatus } from "../models/gameStatus.model";
import { Level } from "../models/level.model";
import { PlayerBoard } from "../models/playerBoard.model";
import { RealBoard } from "../models/realBoard.model";
import { Settings } from "../models/settings.model";

export const realBoardInitialState: RealBoard = {
  entities: [],
  loading: false,
  error: false,
};

export const playerBoardInitialState: PlayerBoard = {
  ...realBoardInitialState,
  gameStatus: GameStatus.NOT_PLAYING,
  flagsLeft: Infinity,
};

export const settingsInitialState: Settings = {
  level: Level.Easy,
  width: 9,
  height: 9,
  totalMines: 3,
};
