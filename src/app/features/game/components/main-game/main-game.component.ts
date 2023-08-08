/* eslint-disable no-unused-vars */
import * as fromAppActions from "../../../../state/app.actions";
import { Component } from "@angular/core";
import { IApp } from "src/app/state/app.interface";
import { Level } from "../../../../models/level.model";
import { Store } from "@ngrx/store";
import { Cell, MineStatus } from "../../../../models/cell.model";

@Component({
  selector: "app-main-game",
  templateUrl: "./main-game.component.html",
  styleUrls: ["./main-game.component.sass"],
})
export class MainGameComponent {
  constructor(private store: Store<IApp>) {
    this.store.dispatch(fromAppActions.setGameLevel({ level: Level.Medium }));
  }

  cell: Cell = {
    clicked: false,
    hasMine: true,
    flagged: false,
    minesInNeighborhood: 0,
    yPos: 0,
    xPos: 0,
    status: MineStatus.Flagged,
  };

  cell2: Cell = {
    clicked: false,
    hasMine: true,
    flagged: false,
    minesInNeighborhood: 0,
    yPos: 0,
    xPos: 0,
    status: MineStatus.None,
  };

  dataArray = [
    [this.cell, this.cell, this.cell],
    [this.cell2, this.cell2, this.cell],
    [this.cell, this.cell, this.cell],
  ];

  rightClick(cell: Cell): void {
    debugger;
  }
  leftClick(cell: Cell): void {
    debugger;
  }
}
