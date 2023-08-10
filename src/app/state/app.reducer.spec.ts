import * as fromAppActions from "../state/app.actions";
import { Action } from "@ngrx/store";
import { AppReducer, initialAppState, reducer } from "./app.reducer";
import { Level } from "../models/level.model";
import { mockBoard } from "../utils/mock-board";
import { mockCell } from "../utils/mock-cell";
import { GameStatus } from "../models/gameStatus.model";

describe("appReducer", () => {
  describe("an unknown action", () => {
    it("should return to previous state", () => {
      const action = {} as unknown as Action;

      const result = reducer(initialAppState, action);

      expect(result).toBe(initialAppState);
    });
  });
  describe("setGameLevel", () => {
    it("should set level properly", () => {
      const action = fromAppActions.setGameLevel({ level: Level.Medium });

      const result = AppReducer(initialAppState, action);

      expect(result.settings.level).toBeTruthy();
      expect(result.settings.level).toBe(Level.Medium);
    });
  });

  describe("startGame", () => {
    it("should set game in progress flag", () => {
      const action = fromAppActions.startGame();

      const result = AppReducer(initialAppState, action);

      expect(result.playerBoard.gameStatus).toBeTruthy();
      expect(result.playerBoard.gameStatus).toBe(GameStatus.IN_PROGRESS);
    });
  });

  describe("setBoardSize", () => {
    it("should update the board width and height", () => {
      const action = fromAppActions.setBoardSize({ width: 10, height: 20 });
      const newState = AppReducer(initialAppState, action);

      expect(newState.settings.width).toEqual(10);
      expect(newState.settings.height).toEqual(20);
    });
  });

  describe("createMatrixSuccess", () => {
    it("should update the realBoard and playerBoard entities", () => {
      const action = fromAppActions.createMatrixSuccess({
        entities: mockBoard,
      });
      const newState = AppReducer(initialAppState, action);

      expect(newState.realBoard.entities).toEqual(mockBoard);
      expect(newState.playerBoard.entities).toEqual(mockBoard);
    });
  });

  describe("updateCell", () => {
    it("should update the specified cell in the playerBoard", () => {
      const specifiedCell = {
        ...mockCell,
        xPos: 0,
        yPos: 1,
      };
      const initialStateWithEntities = {
        ...initialAppState,
        playerBoard: {
          ...initialAppState.playerBoard,
          entities: mockBoard,
        },
      };

      const action = fromAppActions.updateCell({ cell: specifiedCell });
      const newState = AppReducer(initialStateWithEntities, action);

      expect(newState.playerBoard.entities[0][1]).toEqual(specifiedCell);
    });
  });

  describe("clickCellFail", () => {
    it("should set error flag on store", () => {
      const action = fromAppActions.clickCellFail({ message: "error" });
      const newState = AppReducer(initialAppState, action);

      expect(newState.playerBoard.error).toBeTruthy();
    });
  });

  describe("gameOver", () => {
    it("should set game status as Game Over", () => {
      const action = fromAppActions.gameOver();

      const result = AppReducer(initialAppState, action);

      expect(result.playerBoard.gameStatus).toBeTruthy();
      expect(result.playerBoard.gameStatus).toBe(GameStatus.LOST);
    });
  });
});
