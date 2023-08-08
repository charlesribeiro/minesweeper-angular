import { createAction, props } from "@ngrx/store";
import { Level } from "../models/level.model";

export const setGameLevel = createAction(
  "set game level",
  props<{ level: Level }>(),
);
