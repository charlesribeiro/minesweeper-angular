import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IApp } from "./app.interface";
import { userFeatureKey } from "./app.reducer";

export const selectFeature = createFeatureSelector<IApp>(userFeatureKey);

export const selectLevel = createSelector(
  selectFeature,
  (appState: IApp) => appState.settings.level,
);
export const selectRealBoard = createSelector(
  selectFeature,
  (appState: IApp) => appState.realBoard.entities,
);
export const selectPlayerBoard = createSelector(
  selectFeature,
  (appState: IApp) => appState?.playerBoard.entities,
);
export const selectGameStatus = createSelector(
  selectFeature,
  (appState: IApp) => appState?.playerBoard.gameStatus,
);
export const selectGridHeight = createSelector(
  selectFeature,
  (appState: IApp) => appState.settings.height,
);
export const selectGridWidth = createSelector(
  selectFeature,
  (appState: IApp) => appState.settings.width,
);
