import { Action } from "@ngrx/store";
import { mockSettings } from "../../../utils/mock-settings";
import * as fromSettingsActions from "./settings.actions";
import { reducer, initialAppState, SettingsReducer } from "./settings.reducer";

describe("settingsReducer", () => {
  describe("an unknown action", () => {
    it("should return to previous state", () => {
      const action = {} as unknown as Action;

      const result = reducer(initialAppState, action);

      expect(result).toBe(initialAppState);
    });
  });

  describe("setSettings", () => {
    it("should set game settings", () => {
      const settings = { ...mockSettings, width: 11 };
      const action = fromSettingsActions.setSettings({ settings });

      const result = SettingsReducer(initialAppState, action);

      expect(result).toBeTruthy();
      expect(result).toEqual(settings);
    });
  });
});
