import * as fromAppActions from "../state/app.actions";
import { Action } from "@ngrx/store";
import { AppReducer, initialAppState, reducer } from "./app.reducer";
import { mockBoard } from "../utils/mock-board";
import { mockCell } from "../utils/mock-cell";
import { GameStatus } from "../models/gameStatus.model";
import { SessionTypes } from "../models/sessionTypes";

describe("appReducer", () => {
  describe("an unknown action", () => {
    it("should return to previous state", () => {
      const action = {} as unknown as Action;

      const result = reducer(initialAppState, action);

      expect(result).toBe(initialAppState);
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

  describe("createMatrixSuccess", () => {
    it("should update the realBoard and playerBoard entities", () => {
      const action = fromAppActions.createMatrixSuccess({
        entities: mockBoard,
      });
      const newState = AppReducer(initialAppState, action);

      expect(newState.playerBoard.entities).toEqual(mockBoard);
    });
  });

  describe("useDataFromLoad", () => {
    it("should update the realBoard and playerBoard entities", () => {
      const action = fromAppActions.useDataFromLoad();
      const newState = AppReducer(initialAppState, action);

      expect(newState.playerBoard.loading).toBeFalsy();
      expect(newState.playerBoard.error).toBeFalsy();
    });
  });

  describe("loadStateFromFile", () => {
    it("should update the realBoard and playerBoard entities", () => {
      const action = fromAppActions.loadStateFromFile({
        playerBoard: initialAppState.playerBoard,
      });
      const newState = AppReducer(initialAppState, action);

      expect(newState.playerBoard.loading).toBeFalsy();
      expect(newState.playerBoard.error).toBeFalsy();
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

  describe("continueGame", () => {
    it("should set game status as in progress", () => {
      const action = fromAppActions.continueGame();

      const result = AppReducer(initialAppState, action);

      expect(result.playerBoard.gameStatus).toBeTruthy();
      expect(result.playerBoard.gameStatus).toBe(GameStatus.IN_PROGRESS);
    });
  });

  describe("wonGame", () => {
    it("should set game status as in WON", () => {
      const action = fromAppActions.wonGame();

      const result = AppReducer(initialAppState, action);

      expect(result.playerBoard.gameStatus).toBeTruthy();
      expect(result.playerBoard.gameStatus).toBe(GameStatus.WON);
    });
  });

  describe("resetGame", () => {
    it("should reset game", () => {
      const action = fromAppActions.resetGame();

      const result = AppReducer(initialAppState, action);

      expect(result.playerSession.type).toBe(SessionTypes.newGame);
      expect(result.playerBoard.gameStatus).toBe(GameStatus.IN_PROGRESS);
      expect(result.playerBoard.loading).toBeTruthy();
    });
  });
});
