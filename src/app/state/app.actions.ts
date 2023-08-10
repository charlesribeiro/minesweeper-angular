import { createAction, props } from "@ngrx/store";
import { Level } from "../models/level.model";
import { Cell } from "../models/cell.model";

export const setGameLevel = createAction(
  "[Game] set game level",
  props<{ level: Level }>(),
);

export const startGame = createAction("[Game] start game");

export const createMatrixSuccess = createAction(
  "[Game] create matrix success",
  props<{ entities: Cell[][] }>(),
);

export const createMatrixFail = createAction(
  "[Game] create matrix fail action",
  props<{ message: string }>(),
);

export const setRightClick = createAction(
  "[Game] right click",
  props<{ cell: Cell }>(),
);

export const setLeftClick = createAction(
  "[Game] left click",
  props<{ cell: Cell }>(),
);

export const setBoardSize = createAction(
  "[Game] set board size action",
  props<{ width: number; height: number }>(),
);

export const updateCell = createAction(
  "[Game] update cell",
  props<{ cell: Cell }>(),
);

export const clickCellFail = createAction(
  "[Game] click cell fail action",
  props<{ message: string }>(),
);

export const gameOver = createAction("[Game] game over");

export const increaseFlagLeftCount = createAction(
  "[Game] increase flag left count",
);

export const decreaseFlagLeftCount = createAction(
  "[Game] decrease flag left count",
);
