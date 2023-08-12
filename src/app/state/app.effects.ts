import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as fromAppActions from "../state/app.actions";
import { CreateLevelService } from "../services/create-level.service";
import { ClickHandlerService } from "../services/click-handler.service";
import { TimerService } from "../services/timer.service";
import {
  mergeMap,
  map,
  catchError,
  concatMap,
  withLatestFrom,
} from "rxjs/operators";
import { of } from "rxjs";
import { Cell } from "../models/cell.model";
import { Action, Store, select } from "@ngrx/store";
import { IApp } from "./app.interface";
import * as fromAppSelectors from "../state/app.selectors";

@Injectable()
export class AppEffects {
  constructor(
    private store: Store<IApp>,
    private actions$: Actions,
    private createLevelService: CreateLevelService,
    private gameService: ClickHandlerService,
    private timerService: TimerService,
  ) {}
  startGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAppActions.startGame),
      mergeMap(() =>
        this.createLevelService.createMatrix().pipe(
          map((entities) => fromAppActions.createMatrixSuccess({ entities })),
          catchError(({ message }) =>
            of(fromAppActions.createMatrixFail({ message })),
          ),
        ),
      ),
    ),
  );
  leftclick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAppActions.setLeftClick),
      mergeMap(({ cell }) =>
        this.gameService.handleLeftClick(cell).pipe(
          concatMap((cells: Cell[]) => {
            const actions: Action[] = [];

            cells.forEach((cell) => {
              actions.push(fromAppActions.updateCell({ cell }));
            });

            if (cell.hasMine) {
              this.timerService.endTimer();
              actions.push(fromAppActions.gameOver());
            } else {
              actions.push(fromAppActions.checkForWin());
            }

            return of(...actions);
          }),
          catchError(({ message }) =>
            of(fromAppActions.clickCellFail({ message })),
          ),
        ),
      ),
    ),
  );
  rightClick$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAppActions.setRightClick),
      mergeMap(({ cell }) =>
        this.gameService.handleRightClick(cell).pipe(
          concatMap((cell: Cell) => {
            const actions: Action[] = [];
            actions.push(fromAppActions.updateCell({ cell }));

            actions.push(fromAppActions.checkForWin());

            return of(...actions);
          }),
          catchError(({ message }) =>
            of(fromAppActions.clickCellFail({ message })),
          ),
        ),
      ),
    ),
  );
  checkForWin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAppActions.checkForWin),
      withLatestFrom(
        this.store.pipe(select(fromAppSelectors.selectCountOfFlaggedCells)),
        this.store.pipe(select(fromAppSelectors.selectCountOfCellsWithMines)),
        this.store.pipe(
          select(fromAppSelectors.selectPlayerBoardWithoutPristineCells),
        ),
      ),
      mergeMap(([, flaggedCells, cellsWithMines, allCellsAreDecided]) => {
        if (flaggedCells === cellsWithMines && allCellsAreDecided) {
          this.timerService.endTimer();
          return of(fromAppActions.wonGame());
        }
        return of(fromAppActions.continueGame());
      }),
    ),
  );
}
