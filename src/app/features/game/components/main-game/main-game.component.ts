import * as fromAppActions from "../../../../state/app.actions";
import * as fromAppSelectors from "../../../../state/app.selectors";
import { Component, OnInit } from "@angular/core";
import { IApp } from "src/app/state/app.interface";
import { Store, select } from "@ngrx/store";
import { Cell } from "../../../../models/cell.model";
import { StorageService } from "../../../../services/storage.service";
import { combineLatest, filter } from "rxjs";
import { GameStatus } from "../../../../models/gameStatus.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { TimerService } from "../../../../services/timer.service";

@UntilDestroy()
@Component({
  selector: "app-main-game",
  templateUrl: "./main-game.component.html",
  styleUrls: ["./main-game.component.sass"],
})
export class MainGameComponent implements OnInit {
  cells: Cell[][];
  timeElapsed: number = 0;
  gameStatus: GameStatus;
  loading = false;
  error = false;

  flagsLeft: number;

  readonly NOT_PLAYING = GameStatus.NOT_PLAYING;

  constructor(
    private store: Store<IApp>,
    private storage: StorageService,
    private timer: TimerService,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fromAppActions.startGame());

    this.store
      .select(fromAppSelectors.selectPlayerBoardEntities)
      .pipe(untilDestroyed(this))
      .subscribe((cells) => (this.cells = cells));

    this.store
      .select(fromAppSelectors.selectGameError)
      .pipe(untilDestroyed(this))
      .subscribe((error) => (this.error = error));

    this.store
      .select(fromAppSelectors.selectGameLoading)
      .pipe(untilDestroyed(this))
      .subscribe((loading) => (this.loading = loading));

    this.store
      .select(fromAppSelectors.selectGameStatus)
      .pipe(untilDestroyed(this))
      .subscribe((gameStatus) => (this.gameStatus = gameStatus));

    this.timer.currentTimer$
      .pipe(untilDestroyed(this))
      .subscribe((timeElapsed) => (this.timeElapsed = timeElapsed));

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
  reset(): void {
    this.store.dispatch(fromAppActions.resetGame());
  }
}
