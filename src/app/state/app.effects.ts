import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as fromAppActions from "../state/app.actions";
import { CreateLevelService } from "../services/create-level.service";
import { GameService } from "../services/game.service";
import { mergeMap, map, catchError, concatMap } from "rxjs/operators";
import { of } from "rxjs";
import { Cell } from "../models/cell.model";
import { Action } from "@ngrx/store";

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private createLevelService: CreateLevelService,
    private gameService: GameService,
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
          concatMap((cell: Cell) => {
            const actions: Action[] = [];
            actions.push(fromAppActions.updateCell({ cell }));

            if (cell.hasMine) {
              actions.push(fromAppActions.gameOver());
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
          map((cell) => fromAppActions.updateCell({ cell })),
          catchError(({ message }) =>
            of(fromAppActions.clickCellFail({ message })),
          ),
        ),
      ),
    ),
  );
}
