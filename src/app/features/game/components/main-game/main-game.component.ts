/* eslint-disable no-unused-vars */
import * as fromAppActions from "../../../../state/app.actions";
import { Component } from "@angular/core";
import { IApp } from "src/app/state/app.interface";
import { Level } from "../../../../models/level.model";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-main-game",
  templateUrl: "./main-game.component.html",
  styleUrls: ["./main-game.component.sass"],
})
export class MainGameComponent {
  constructor(private store: Store<IApp>) {
    this.store.dispatch(fromAppActions.setGameLevel({ level: Level.Medium }));
  }
}
