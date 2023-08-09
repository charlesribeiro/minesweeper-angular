import { createAction, props } from "@ngrx/store";
import { Level } from "../models/level.model";
import { Cell } from "../models/cell.model";

export const setGameLevel = createAction(
  "set game level",
  props<{ level: Level }>(),
);

export const startGame = createAction("start game");

export const generate2DCellArraySuccess = createAction(
  "generate2DCellArray success",
  props<{ entities: Cell[][] }>(),
);

export const generate2DCellArrayFail = createAction(
  "generate2DCellArray fail action",
  props<{ message: string }>(),
);

export const toggleFlag = createAction("toggle flag", props<{ cell: Cell }>());

export const setClick = createAction("set click", props<{ cell: Cell }>());

export const setBoardSize = createAction(
  "set board size action",
  props<{ width: number; height: number }>(),
);

export const updateCell = createAction("update cell", props<{ cell: Cell }>());
