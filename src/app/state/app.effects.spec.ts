import { Action } from "@ngrx/store";
import { AppEffects } from "./app.effects";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { initialAppState as initialState } from "../state/app.reducer";
import { Observable, of, throwError } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { TestBed } from "@angular/core/testing";
import { CreateLevelService } from "../services/create-level.service";
import { ClickHandlerService } from "../services/click-handler.service";
import * as fromAppActions from "../state/app.actions";
import * as fromAppSelectors from "../state/app.selectors";

import { hot, cold } from "jasmine-marbles";
import { mockBoard } from "../utils/mock-board";
import {
  mockCell,
  mockCellWithFlag,
  mockPristineCellWithoutMine,
} from "../utils/mock-cell";
import { IApp } from "./app.interface";
import { TimerService } from "../services/timer.service";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { mockSettings } from "../utils/mock-settings";

describe("AppEffects", () => {
  let actions$: Observable<Action>;
  let effects: AppEffects;
  let createLevelService: CreateLevelService;
  let gameService: ClickHandlerService;
  let timerService: TimerService;
  let store: MockStore<IApp>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AppEffects,
        TimerService,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });
  });

  beforeEach(() => {
    effects = TestBed.inject<AppEffects>(AppEffects);
    createLevelService = TestBed.inject(CreateLevelService);
    store = TestBed.inject(MockStore);
    gameService = TestBed.inject(ClickHandlerService);
    timerService = TestBed.inject(TimerService);
    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });

  describe("startGame$", () => {
    it("should dispatch createMatrixSuccess when successful", () => {
      jest
        .spyOn(createLevelService, "createMatrix")
        .mockReturnValue(of(mockBoard));

      actions$ = hot("-a", { a: fromAppActions.startGame() });
      const expected = cold("-b", {
        b: fromAppActions.createMatrixSuccess({
          entities: mockBoard,
        }),
      });

      expect(effects.startGame$).toBeObservable(expected);
    });

    it("should dispatch createMatrixFail when there is an error", () => {
      jest
        .spyOn(createLevelService, "createMatrix")
        .mockReturnValue(throwError(new Error("Error")));

      actions$ = hot("-a", { a: fromAppActions.startGame() });
      const expected = cold("-b", {
        b: fromAppActions.createMatrixFail({ message: "Error" }),
      });

      expect(effects.startGame$).toBeObservable(expected);
    });
  });

  describe("leftclick$", () => {
    it("should update cell when successful and set game over when clicked cell has mine", () => {
      jest
        .spyOn(gameService, "handleLeftClick")
        .mockReturnValue(of([mockCell]));

      actions$ = hot("-a", {
        a: fromAppActions.setLeftClick({ cell: mockCell }),
      });
      const expected = cold("-(bc)", {
        b: fromAppActions.updateCell({
          cell: mockCell,
        }),
        c: fromAppActions.gameOver(),
      });
      expect(effects.leftclick$).toBeObservable(expected);
    });

    it("should update cell when successful and not set game over when clicked cell has no mine", () => {
      jest
        .spyOn(gameService, "handleLeftClick")
        .mockReturnValue(of([mockPristineCellWithoutMine]));

      actions$ = hot("-a", {
        a: fromAppActions.setLeftClick({ cell: mockPristineCellWithoutMine }),
      });
      const expected = cold("-(bc)", {
        b: fromAppActions.updateCell({
          cell: mockPristineCellWithoutMine,
        }),
        c: fromAppActions.checkForWin(),
      });
      expect(effects.leftclick$).toBeObservable(expected);
    });

    it("should not update cell when failing ", () => {
      jest
        .spyOn(gameService, "handleLeftClick")
        .mockReturnValue(throwError(new Error("Error")));

      actions$ = hot("-a", {
        a: fromAppActions.setLeftClick({ cell: mockCell }),
      });
      const expected = cold("-b", {
        b: fromAppActions.clickCellFail({ message: "Error" }),
      });
      expect(effects.leftclick$).toBeObservable(expected);
    });
  });

  describe("rightclick$", () => {
    it("should update cell when successful and increase flag count", () => {
      jest.spyOn(gameService, "handleRightClick").mockReturnValue(of(mockCell));

      actions$ = hot("-a", {
        a: fromAppActions.setRightClick({ cell: mockCell }),
      });
      const expected = cold("-(bc)", {
        b: fromAppActions.updateCell({
          cell: mockCell,
        }),
        c: fromAppActions.checkForWin(),
      });
      expect(effects.rightClick$).toBeObservable(expected);
    });

    it("should update cell when successful and increase flag count", () => {
      jest
        .spyOn(gameService, "handleRightClick")
        .mockReturnValue(of(mockCellWithFlag));

      actions$ = hot("-a", {
        a: fromAppActions.setRightClick({ cell: mockCellWithFlag }),
      });
      const expected = cold("-(bc)", {
        b: fromAppActions.updateCell({
          cell: mockCellWithFlag,
        }),
        c: fromAppActions.checkForWin(),
      });
      expect(effects.rightClick$).toBeObservable(expected);
    });

    it("should not update cell when failing", () => {
      jest
        .spyOn(gameService, "handleRightClick")
        .mockReturnValue(throwError(new Error("Error")));

      actions$ = hot("-a", {
        a: fromAppActions.setRightClick({ cell: mockCell }),
      });
      const expected = cold("-b", {
        b: fromAppActions.clickCellFail({ message: "Error" }),
      });
      expect(effects.rightClick$).toBeObservable(expected);
    });
  });
  describe("checkForWin$", () => {
    it("should dispatch wonGame action when win condition is met", () => {
      jest.spyOn(timerService, "toggleTimer");
      actions$ = hot("-a", { a: fromAppActions.checkForWin() });

      store.overrideSelector(fromAppSelectors.selectCountOfFlaggedCells, 5);
      store.overrideSelector(fromAppSelectors.selectCountOfCellsWithMines, 5);
      store.overrideSelector(
        fromAppSelectors.selectPlayerBoardWithoutPristineCells,
        true,
      );

      const expected = cold("-b", { b: fromAppActions.wonGame() });

      expect(effects.checkForWin$).toBeObservable(expected);
    });

    it("should dispatch continueGame action when win condition is not met", () => {
      actions$ = hot("-a", { a: fromAppActions.checkForWin() });

      store.overrideSelector(fromAppSelectors.selectCountOfFlaggedCells, 5);
      store.overrideSelector(fromAppSelectors.selectCountOfCellsWithMines, 4);
      store.overrideSelector(
        fromAppSelectors.selectPlayerBoardWithoutPristineCells,
        true,
      );

      const expected = cold("-b", { b: fromAppActions.continueGame() });

      expect(effects.checkForWin$).toBeObservable(expected);
    });
  });

  describe("setSettings$", () => {
    it('should navigate to "game" when setSettings action is dispatched', () => {
      // Spy on the router's navigate method to check if it gets called
      const navigateSpy = jest.spyOn(router, "navigate");

      // Simulate the setSettings action being dispatched
      actions$ = hot("-a", {
        a: fromAppActions.setSettings({
          settings: mockSettings,
        }),
      });

      // Let the effect run and ensure it calls the navigate method with the correct arguments
      effects.setSettings$.subscribe(() => {
        expect(navigateSpy).toHaveBeenCalledWith(["game"]);
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
