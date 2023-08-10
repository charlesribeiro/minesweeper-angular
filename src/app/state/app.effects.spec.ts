import { Action } from "@ngrx/store";
import { AppEffects } from "./app.effects";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { initialAppState as initialState } from "../state/app.reducer";
import { Observable, of, throwError } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { TestBed } from "@angular/core/testing";
import { CreateLevelService } from "../services/create-level.service";
import { ClickHandlerService } from "../services/click-handler.service";
import * as fromAppActions from "../state/app.actions";
import { hot, cold } from "jasmine-marbles";
import { mockBoard } from "../utils/mock-board";
import {
  mockCell,
  mockCellWithFlag,
  mockPristineCellWithoutMine,
} from "../utils/mock-cell";

describe("AppEffects", () => {
  let actions$: Observable<Action>;
  let effects: AppEffects;
  let createLevelService: CreateLevelService;
  let gameService: ClickHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });
  });

  beforeEach(() => {
    effects = TestBed.inject<AppEffects>(AppEffects);
    createLevelService = TestBed.inject(CreateLevelService);
    gameService = TestBed.inject(ClickHandlerService);
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
      const expected = cold("-b", {
        b: fromAppActions.updateCell({
          cell: mockPristineCellWithoutMine,
        }),
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
        c: fromAppActions.increaseFlagLeftCount(),
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
        c: fromAppActions.decreaseFlagLeftCount(),
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
});
