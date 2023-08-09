/* eslint-disable no-unused-vars */
import * as fromAppActions from "../../../../state/app.actions";
import * as fromAppSelectors from "../../../../state/app.selectors";
import { Component, OnInit } from "@angular/core";
import { IApp } from "src/app/state/app.interface";
import { Store } from "@ngrx/store";
import { Cell } from "../../../../models/cell.model";
import { StorageService } from "../../../../services/storage.service";
import { Observable } from "rxjs";
import { Level } from "../../../../models/level.model";

@Component({
  selector: "app-main-game",
  templateUrl: "./main-game.component.html",
  styleUrls: ["./main-game.component.sass"],
})
export class MainGameComponent implements OnInit {
  cells$: Observable<Cell[][]>;

  constructor(
    private store: Store<IApp>,
    private storage: StorageService,
  ) {
    this.store.dispatch(fromAppActions.setGameLevel({ level: Level.Hard }));
    this.cells$ = this.store.select(fromAppSelectors.selectPlayerBoard);
  }

  ngOnInit(): void {
    this.store.dispatch(fromAppActions.setBoardSize({ width: 30, height: 20 }));
    this.store.dispatch(fromAppActions.startGame());
  }

  rightClick(cell: Cell): void {
    // this.storage.saveCache("1", ["bla"]);
    this.store.dispatch(fromAppActions.toggleFlag({ cell }));
  }
  leftClick(cell: Cell): void {
    this.store.dispatch(fromAppActions.setClick({ cell }));
  }
}
