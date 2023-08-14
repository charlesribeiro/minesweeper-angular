import { GameStatus } from "../models/gameStatus.model";
import { Level } from "../models/level.model";
import { SessionTypes } from "../models/sessionTypes";
import {
  mock3x3BoardGameInProgress,
  mock3x3BoardGameWon,
  mock3x3BoardWith8Mines,
} from "../utils/mock-board";
import { mockSettings } from "../utils/mock-settings";
import { IApp, IAppState } from "./app.interface";
import { initialAppState } from "./app.reducer";
import * as fromAppSelectors from "./app.selectors";

describe("AppSelectors", () => {
  const initialState: IAppState = {
    AppState: {
      ...initialAppState,
      settings: mockSettings,
      playerBoard: { ...initialAppState.playerBoard, flagsLeft: 8 },
    },
  };
  const getAppState = (state: IAppState): IApp => state.AppState;

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

  it("should select current game status", () => {
    const result = fromAppSelectors.selectGameStatus.projector(
      getAppState(initialState),
    );

    expect(result).toEqual(GameStatus.NOT_PLAYING);
  });

  it("should select current game loading", () => {
    const mockState: IApp = {
      ...initialAppState,
      playerBoard: {
        ...initialAppState.playerBoard,
        loading: true,
      },
    };
    const result = fromAppSelectors.selectGameLoading.projector(mockState);

    expect(result).toEqual(true);
  });

  it("should select current game error", () => {
    const mockState: IApp = {
      ...initialAppState,
      playerBoard: {
        ...initialAppState.playerBoard,
        error: true,
      },
    };
    const result = fromAppSelectors.selectGameError.projector(mockState);

    expect(result).toEqual(true);
  });

  it("should select player board", () => {
    const result = fromAppSelectors.selectPlayerBoard.projector(
      getAppState(initialState),
    );

    expect(result).toEqual({ ...initialAppState.playerBoard, flagsLeft: 8 });
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

    expect(result).toEqual(false);
  });

  it("should return the count of flagged cells", () => {
    const mockState: IApp = {
      ...initialAppState,
      playerBoard: {
        ...initialAppState.playerBoard,
        entities: mock3x3BoardGameInProgress,
      },
    };
    const result =
      fromAppSelectors.selectCountOfFlaggedCells.projector(mockState);

    expect(result).toEqual(1);
  });

  it("should return the count of cells with mines", () => {
    const mockState: IApp = {
      ...initialAppState,
      playerBoard: {
        ...initialAppState.playerBoard,
        entities: mock3x3BoardWith8Mines,
      },
    };
    const result =
      fromAppSelectors.selectCountOfCellsWithMines.projector(mockState);

    expect(result).toEqual(8);
  });

  it("should select session type", () => {
    const result = fromAppSelectors.selectSessionType.projector(
      getAppState(initialState),
    );

    expect(result).toEqual(SessionTypes.newGame);
  });
});
