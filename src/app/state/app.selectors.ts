import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IApp } from "./app.interface";
import { userFeatureKey } from "./app.reducer";
import { Cell, MineStatus } from "../models/cell.model";

export const selectFeature = createFeatureSelector<IApp>(userFeatureKey);

export const selectPlayerBoard = createSelector(
  selectFeature,
  (appState: IApp) => appState?.playerBoard,
);
export const selectPlayerBoardEntities = createSelector(
  selectFeature,
  (appState: IApp) => appState?.playerBoard.entities,
);
export const selectGameStatus = createSelector(
  selectFeature,
  (appState: IApp) => appState?.playerBoard.gameStatus,
);
// export const selectFlagsLeft = createSelector(
//   selectFeature,
//   (appState: IApp) => appState?.playerBoard.flagsLeft,
// );
export const selectGameLoading = createSelector(
  selectFeature,
  (appState: IApp) => appState?.playerBoard.loading,
);
export const selectGameError = createSelector(
  selectFeature,
  (appState: IApp) => appState?.playerBoard.error,
);
export const selectSessionType = createSelector(
  selectFeature,
  (appState: IApp) => appState?.playerSession.type,
);

export const selectPlayerBoardWithoutPristineCells = createSelector(
  selectFeature,
  (appState: IApp) => {
    const entities = appState?.playerBoard.entities;

    return entities?.every((row) =>
      row.every((cell: Cell) => cell.status !== MineStatus.Pristine),
    );
  },
);

export const selectCountOfFlaggedCells = createSelector(
  selectFeature,
  (appState: IApp) => {
    const entities = appState?.playerBoard.entities;

    if (!entities) return 0;

    return entities.reduce((rowCount, row) => {
      const flaggedInRow = row.filter(
        (cell: Cell) => cell.status === MineStatus.Flagged,
      ).length;
      return rowCount + flaggedInRow;
    }, 0);
  },
);

export const selectCountOfCellsWithMines = createSelector(
  selectFeature,
  (appState: IApp) => {
    const entities = appState?.playerBoard.entities;

    if (!entities) return 0;

    return entities.reduce((rowCount, row) => {
      const flaggedInRow = row.filter((cell: Cell) => cell.hasMine).length;
      return rowCount + flaggedInRow;
    }, 0);
  },
);
