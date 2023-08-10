import { Injectable } from "@angular/core";
import * as fromAppSelectors from "../state/app.selectors";
import { Level } from "../models/level.model";
import { Cell, MineStatus } from "../models/cell.model";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { IApp } from "../state/app.interface";

@Injectable({
  providedIn: "root",
})
export class GameService {
  level: Level;
  width: number;
  height: number;
  realCells: Cell[][];

  constructor(private readonly store: Store<IApp>) {
    this.store
      .select(fromAppSelectors.selectLevel)
      .subscribe((level: Level) => (this.level = level));

    this.store
      .select(fromAppSelectors.selectGridHeight)
      .subscribe((height: number) => (this.height = height));

    this.store
      .select(fromAppSelectors.selectGridWidth)
      .subscribe((width: number) => (this.width = width));

    this.store
      .select(fromAppSelectors.selectRealBoard)
      .subscribe((realCells: Cell[][]) => (this.realCells = realCells));
  }

  handleLeftClick(selectedCell: Cell): Observable<Cell> {
    if (selectedCell.status === MineStatus.Flagged) {
      return of(selectedCell);
    }

    if (selectedCell.hasMine) {
      return of({ ...selectedCell, status: MineStatus.Mine });
    }

    return of({
      ...selectedCell,
      status: this.getMinesInNeighborhood(selectedCell),
    });
  }

  handleRightClick(selectedCell: Cell): Observable<Cell> {
    if (selectedCell.status === MineStatus.Pristine) {
      return of({ ...selectedCell, status: MineStatus.Flagged });
    }

    if (selectedCell.status === MineStatus.Flagged) {
      return of({ ...selectedCell, status: MineStatus.Pristine });
    }
    return of(selectedCell);
  }

  getMinesInNeighborhood(selectedCell: Cell): number {
    const neighboringOffsets = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, 1],
      [-1, -1],
      [1, 1],
      [1, -1],
    ];

    return neighboringOffsets.reduce((totalMines, [xOffset, yOffset]) => {
      const newX = selectedCell.xPos + xOffset;
      const newY = selectedCell.yPos + yOffset;

      if (this.isCellValid(newX, newY) && this.realCells[newX][newY].hasMine) {
        return totalMines + 1;
      }

      return totalMines;
    }, 0);
  }

  isCellValid(row: number, column: number) {
    return row >= 0 && row < this.height && column >= 0 && column < this.width;
  }
}
