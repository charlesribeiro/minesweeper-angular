import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as fromSettingsActions from "./settings.actions";

import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { IApp } from "src/app/state/app.interface";

@Injectable()
export class SettingsEffects {
  constructor(
    private store: Store<IApp>,
    private actions$: Actions,
    private router: Router,
  ) {}

  setSettingsOrSetSave$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromSettingsActions.setSettings),
        tap(() => this.router.navigate(["game"])),
      ),
    { dispatch: false },
  );
}
