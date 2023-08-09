import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as fromAppActions from "../state/app.actions";
import { CreateLevelService } from "../services/create-level.service";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private createLevelService: CreateLevelService,
  ) {}
  loadGame$ = createEffect(() =>
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
}
