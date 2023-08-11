import * as fromAppActions from "../../../../state/app.actions";
import * as fromAppSelectors from "../../../../state/app.selectors";
import { Component, OnInit } from "@angular/core";
import { IApp } from "src/app/state/app.interface";
import { Store } from "@ngrx/store";
import { Cell } from "../../../../models/cell.model";
import { StorageService } from "../../../../services/storage.service";
import { Observable, combineLatest, map } from "rxjs";
import { Level } from "../../../../models/level.model";
import { GameStatus } from "../../../../models/gameStatus.model";

@Component({
  selector: "app-main-game",
  templateUrl: "./main-game.component.html",
  styleUrls: ["./main-game.component.sass"],
})
export class MainGameComponent implements OnInit {
  cells$: Observable<Cell[][]>;
  gameStatus$: Observable<GameStatus>;
  flagsLeft$: Observable<number>;

  readonly GAMEOVER = GameStatus.LOST;
  readonly WON = GameStatus.WON;

  constructor(
    private store: Store<IApp>,
    private storage: StorageService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fromAppActions.setGameLevel({ level: Level.Easy }));
    this.store.dispatch(fromAppActions.setBoardSize({ width: 5, height: 5 }));
    this.store.dispatch(fromAppActions.startGame());
    this.cells$ = this.store.select(fromAppSelectors.selectPlayerBoard);
    this.gameStatus$ = this.store.select(fromAppSelectors.selectGameStatus);

    this.flagsLeft$ = combineLatest([
      this.store.select(fromAppSelectors.selectCountOfCellsWithMines),
      this.store.select(fromAppSelectors.selectCountOfFlaggedCells),
    ]).pipe(
      map(([totalMines, flagsAlreadyUsed]) => totalMines - flagsAlreadyUsed),
    );
  }

  rightClick(cell: Cell): void {
    this.store.dispatch(fromAppActions.setRightClick({ cell }));
  }
  leftClick(cell: Cell): void {
    this.store.dispatch(fromAppActions.setLeftClick({ cell }));
  }
}
