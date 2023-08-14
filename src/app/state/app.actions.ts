import { createAction, props } from "@ngrx/store";
import { Cell } from "../models/cell.model";
import { PlayerBoard } from "../models/playerBoard.model";

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

export const checkForWin = createAction("[Game] check for win");

export const wonGame = createAction("[Game] won game");

export const continueGame = createAction("[Game] continue game");

export const resetGame = createAction("[Game] reset game");

export const loadStateFromFile = createAction(
  "[Save and Load] load state from file",
  props<{ playerBoard: PlayerBoard }>(),
);

export const useDataFromLoad = createAction("[Game] use data from load");
