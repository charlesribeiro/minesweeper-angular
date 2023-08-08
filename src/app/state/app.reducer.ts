import { Action, createReducer, on } from "@ngrx/store";
import { IApp } from "./app.interface";
import {
  settingsInitialState,
  storeListInitialState,
} from "../utils/store-utils";
import { setGameLevel } from "./app.actions";

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
);

export function AppReducer(state: IApp | undefined, action: Action): IApp {
  return reducer(state as IApp, action as Action);
}
