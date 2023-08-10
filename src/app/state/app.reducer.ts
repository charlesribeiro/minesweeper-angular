import { Action, createReducer, on } from "@ngrx/store";
import { IApp } from "./app.interface";
import {
  settingsInitialState,
  storeListInitialState,
} from "../utils/store-utils";
import {
  clickCellFail,
  generate2DCellArraySuccess,
  setBoardSize,
  setGameLevel,
  updateCell,
} from "./app.actions";

export const userFeatureKey = "AppState";

export const initialAppState: IApp = {
  playerBoard: storeListInitialState,
  realBoard: storeListInitialState,
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
  on(generate2DCellArraySuccess, (state, { entities }) => ({
    ...state,
    realBoard: {
      ...state.realBoard,
      entities,
    },
    playerBoard: {
      ...state.playerBoard,
      entities,
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
);

export function AppReducer(state: IApp | undefined, action: Action): IApp {
  return reducer(state as IApp, action as Action);
}
