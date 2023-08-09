import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as fromAppActions from "../state/app.actions";
import { CreateLevelService } from "../services/create-level.service";
import { GameService } from "../services/game.service";

import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

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
        this.createLevelService.generate2DCellArray().pipe(
          map((entities) =>
            fromAppActions.generate2DCellArraySuccess({ entities }),
          ),
          catchError(({ message }) =>
            of(fromAppActions.generate2DCellArrayFail({ message })),
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
          map((cell) => fromAppActions.updateCell({ cell })),
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
