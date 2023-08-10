import { GameStatus } from "../models/gameStatus.model";
import { Level } from "../models/level.model";
import {
  mock3x3BoardGameInProgress,
  mock3x3BoardGameWon,
} from "../utils/mock-board";
import { IApp, IAppState } from "./app.interface";
import { initialAppState } from "./app.reducer";
import * as fromAppSelectors from "./app.selectors";

describe("AppSelectors", () => {
  const initialState: IAppState = {
    AppState: {
      ...initialAppState,
      settings: { ...initialAppState.settings, level: Level.Hard },
      playerBoard: { ...initialAppState.playerBoard, flagsLeft: 8 },
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
  it("should select total mines", () => {
    const result = fromAppSelectors.selectFlagsLeft.projector(
      getAppState(initialState),
    );
    expect(result).toEqual(8);
  });
  it("should select player board without any pristine cells", () => {
    const mockState: IApp = {
      ...initialAppState,
      playerBoard: {
        ...initialAppState.playerBoard,
        entities: mock3x3BoardGameWon,
      },
    };

    const result =
      fromAppSelectors.selectPlayerBoardWithoutPristineCells.projector(
        mockState,
      );
    expect(result).toEqual(true);
  });

  it("should detect pristine cells in player board", () => {
    const mockState: IApp = {
      ...initialAppState,
      playerBoard: {
        ...initialAppState.playerBoard,
        entities: mock3x3BoardGameInProgress,
      },
    };

    const result =
      fromAppSelectors.selectPlayerBoardWithoutPristineCells.projector(
        mockState,
      );
    expect(result).toEqual(false); // contains pristine cells in the mock data
  });
});
