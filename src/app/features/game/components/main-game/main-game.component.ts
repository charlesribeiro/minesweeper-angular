import * as fromAppActions from "../../../../state/app.actions";
import * as fromAppSelectors from "../../../../state/app.selectors";
import { Component, OnInit } from "@angular/core";
import { IApp } from "src/app/state/app.interface";
import { Store, select } from "@ngrx/store";
import { Cell } from "../../../../models/cell.model";
import { StorageService } from "../../../../services/storage.service";
import { Observable, combineLatest, filter } from "rxjs";
import { Level } from "../../../../models/level.model";
import { GameStatus } from "../../../../models/gameStatus.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
@UntilDestroy()
@Component({
  selector: "app-main-game",
  templateUrl: "./main-game.component.html",
  styleUrls: ["./main-game.component.sass"],
})
export class MainGameComponent implements OnInit {
  cells$: Observable<Cell[][]>;
  gameStatus$: Observable<GameStatus>;

  flagsLeft: number;

  readonly GAMESTATUS = GameStatus;

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

    combineLatest([
      this.store.pipe(select(fromAppSelectors.selectCountOfCellsWithMines)),
      this.store.pipe(select(fromAppSelectors.selectCountOfFlaggedCells)),
    ])
      .pipe(
        untilDestroyed(this),
        filter(([totalMines]) => !!totalMines),
      )
      .subscribe(
        ([totalMines, flagsAlreadyUsed]) =>
          (this.flagsLeft = totalMines - flagsAlreadyUsed),
      );
  }

  rightClick(cell: Cell): void {
    this.store.dispatch(fromAppActions.setRightClick({ cell }));
  }
  leftClick(cell: Cell): void {
    this.store.dispatch(fromAppActions.setLeftClick({ cell }));
  }
}
