/* eslint-disable no-unused-vars */
import * as fromAppActions from "../../../../state/app.actions";
import { Component } from "@angular/core";
import { IApp } from "src/app/state/app.interface";
import { Level } from "../../../../models/level.model";
import { Store } from "@ngrx/store";
import { Cell } from "../../../../models/cell.model";
import { StorageService } from "../../../../services/storage.service";
import { CreateLevelService } from "../../../../services/create-level.service";

@Component({
  selector: "app-main-game",
  templateUrl: "./main-game.component.html",
  styleUrls: ["./main-game.component.sass"],
})
export class MainGameComponent {
  cells: Cell[][];

  constructor(
    private store: Store<IApp>,
    private storage: StorageService,
    private createLeve: CreateLevelService,
  ) {
    this.store.dispatch(fromAppActions.setGameLevel({ level: Level.Medium }));
    this.createLeve.generate2DCellArray().subscribe((cells) => {
      this.cells = cells;
    });
  }

  rightClick(cell: Cell): void {
    debugger;
    this.storage.saveCache("1", ["bla"]);
  }
  leftClick(cell: Cell): void {
    debugger;
  }
}
