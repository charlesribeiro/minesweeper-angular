import { Action, createReducer, on } from "@ngrx/store";
import { setSettings } from "./settings.actions";
import { Settings } from "../../../models/settings.model";
import { Level } from "../../../models/level.model";

export const userFeatureKey = "Settings";

export const initialAppState: Settings = {
  level: Level.Easy,
  width: 9,
  height: 9,
  totalMines: 9,
};

export const reducer = createReducer(
  initialAppState as Settings,
  on(setSettings, (state, { settings }) => ({
    ...settings,
  })),
);

export function SettingsReducer(
  state: Settings | undefined,
  action: Action,
): Settings {
  return reducer(state as Settings, action as Action);
}
