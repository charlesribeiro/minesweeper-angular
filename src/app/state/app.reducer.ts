import { Action, createReducer, on } from "@ngrx/store";
import { IApp } from "./app.interface";
import {
  playerBoardInitialState,
  realBoardInitialState,
  settingsInitialState,
} from "../utils/store-utils";
import {
  clickCellFail,
  gameOver,
  createMatrixSuccess,
  setBoardSize,
  setGameLevel,
  updateCell,
  startGame,
  wonGame,
  continueGame,
  setSettings,
  resetGame,
  loadStateFromFile,
} from "./app.actions";
import { GameStatus } from "../models/gameStatus.model";

export const userFeatureKey = "AppState";

export const initialAppState: IApp = {
  playerBoard: playerBoardInitialState,
  realBoard: realBoardInitialState,
  settings: settingsInitialState,
};

export const reducer = createReducer(
  initialAppState as IApp,
  on(setGameLevel, (state, { level }) => ({
    ...state,
    settings: {
      ...state.settings,
      level,
    },
  })),
  on(setBoardSize, (state, { width, height }) => ({
    ...state,
    settings: { ...state.settings, width, height },
  })),
  on(createMatrixSuccess, (state, { entities }) => ({
    ...state,
    realBoard: {
      ...state.realBoard,
      entities,
      error: false,
      loading: false,
    },
    playerBoard: {
      ...state.playerBoard,
      entities,
      error: false,
      loading: false,
    },
  })),
  on(loadStateFromFile, (state, { playerBoard }) => ({
    ...state,
    playerBoard,
  })),
  on(resetGame, (state) => ({
    ...state,
    playerBoard: {
      ...state.playerBoard,
      gameStatus: GameStatus.IN_PROGRESS,
      flagsLeft: state.settings.totalMines,
      loading: true,
      error: false,
    },
  })),
  on(startGame, (state) => ({
    ...state,
    playerBoard: {
      ...state.playerBoard,
      gameStatus: GameStatus.IN_PROGRESS,
      flagsLeft: state.settings.totalMines,
      loading: true,
      error: false,
    },
  })),
  on(updateCell, (state, { cell }) => {
    const updatedEntities = state.playerBoard.entities.map((row) => [...row]);
    updatedEntities[cell.xPos][cell.yPos] = cell;

    return {
      ...state,
      playerBoard: {
        ...state.playerBoard,
        entities: updatedEntities,
      },
    };
  }),
  on(clickCellFail, (state) => ({
    ...state,
    playerBoard: {
      ...state.playerBoard,
      error: true,
    },
  })),
  on(gameOver, (state) => ({
    ...state,
    playerBoard: {
      ...state.playerBoard,
      gameStatus: GameStatus.LOST,
    },
  })),
  on(continueGame, (state) => ({
    ...state,
    playerBoard: {
      ...state.playerBoard,
      gameStatus: GameStatus.IN_PROGRESS,
    },
  })),
  on(wonGame, (state) => ({
    ...state,
    playerBoard: {
      ...state.playerBoard,
      gameStatus: GameStatus.WON,
    },
  })),
  on(setSettings, (state, { settings }) => ({
    ...state,
    settings,
  })),
);

export function AppReducer(state: IApp | undefined, action: Action): IApp {
  return reducer(state as IApp, action as Action);
}
