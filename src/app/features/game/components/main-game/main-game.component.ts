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
})
export class MainGameComponent implements OnInit {
  cells$: Observable<Cell[][]>;

  constructor(
    private store: Store<IApp>,
    private storage: StorageService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fromAppActions.setGameLevel({ level: Level.Easy }));
    this.store.dispatch(fromAppActions.setBoardSize({ width: 30, height: 20 }));
    this.store.dispatch(fromAppActions.startGame());
    this.cells$ = this.store.select(fromAppSelectors.selectPlayerBoard);
  }

  rightClick(cell: Cell): void {
    this.store.dispatch(fromAppActions.setRightClick({ cell }));
  }
  leftClick(cell: Cell): void {
    this.store.dispatch(fromAppActions.setLeftClick({ cell }));
  }
}
