import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IApp } from "./app.interface";
import { userFeatureKey } from "./app.reducer";

export const selectFeature = createFeatureSelector<IApp>(userFeatureKey);
export const selectLevel = createSelector(
  selectFeature,
  (appState: IApp) => appState.settings.level,
);
