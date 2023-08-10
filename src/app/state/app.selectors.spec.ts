import { GameStatus } from "../models/gameStatus.model";
import { Level } from "../models/level.model";
import { IApp, IAppState } from "./app.interface";
import { initialAppState } from "./app.reducer";
import * as fromAppSelectors from "./app.selectors";

describe("AppSelectors", () => {
  const initialState: IAppState = {
    AppState: {
      ...initialAppState,
      settings: { ...initialAppState.settings, level: Level.Hard },
    },
  };
  const getAppState = (state: IAppState): IApp => state.AppState;

  it("should select current game level", () => {
    const result = fromAppSelectors.selectLevel.projector(
      getAppState(initialState),
    );

    expect(result).toEqual(Level.Hard);
  });
  it("should select current game status", () => {
    const result = fromAppSelectors.selectGameStatus.projector(
      getAppState(initialState),
    );

    expect(result).toEqual(GameStatus.NOT_PLAYING);
  });
});
