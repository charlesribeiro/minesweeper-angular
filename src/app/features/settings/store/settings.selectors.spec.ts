import { Settings } from "src/app/models/settings.model";
import * as fromAppSelectors from "./settings.selectors";
import { mockSettings } from "../../../utils/mock-settings";
import { Level } from "../../../models/level.model";

describe("SettingsSelectors", () => {
  const initialState: Settings = {
    ...mockSettings,
  };
  const getAppState = (state: Settings): Settings => state;

  it("should select current settings", () => {
    const result = fromAppSelectors.selectSettings.projector(
      getAppState(initialState),
    );

    expect(result).toEqual(mockSettings);
  });

  it("should select current game level", () => {
    const result = fromAppSelectors.selectSettingsLevel.projector(
      getAppState(initialState),
    );

    expect(result).toEqual(Level.Easy);
  });
});
