import * as fromAppActions from "../state/app.actions";
import { Action } from "@ngrx/store";
import { AppReducer, initialAppState, reducer } from "./app.reducer";
import { Level } from "../models/level.model";

describe("appReducer", () => {
  describe("getCharactersAll", () => {
    it("should return to previous state", () => {
      const action = {} as Action;

      const result = reducer(initialAppState, action);

      expect(result).toBe(initialAppState);
    });

    it("should set level properly", () => {
      const action = fromAppActions.setGameLevel({ level: Level.Medium });

      const result = AppReducer(initialAppState, action);

      expect(result.level).toBeTruthy();
      expect(result.level).toBe(Level.Medium);
    });
  });
});
