import { Settings } from "src/app/models/settings.model";
import { userFeatureKey } from "./settings.reducer";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectFeature = createFeatureSelector<Settings>(userFeatureKey);

export const selectSettings = createSelector(
  selectFeature,
  (settings: Settings) => settings,
);
export const selectSettingsLevel = createSelector(
  selectFeature,
  (settings: Settings) => settings.level,
);
export const selectSettingsTotalMines = createSelector(
  selectFeature,
  (settings: Settings) => settings.totalMines,
);
export const selectGridHeight = createSelector(
  selectFeature,
  (settings: Settings) => settings.height,
);
export const selectGridWidth = createSelector(
  selectFeature,
  (settings: Settings) => settings.width,
);
