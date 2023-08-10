import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IApp } from "./app.interface";
import { userFeatureKey } from "./app.reducer";
import { MineStatus } from "../models/cell.model";

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
export const selectFlagsLeft = createSelector(
  selectFeature,
  (appState: IApp) => appState?.playerBoard.flagsLeft,
);
export const selectPlayerBoardWithoutPristineCells = createSelector(
  selectFeature,
  (appState: IApp) => {
    const entities = appState?.playerBoard.entities;

    return entities?.every((row) =>
      row.every((cell) => cell.status !== MineStatus.Pristine),
    );
  },
);
