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

  handleClick(selectedCell: Cell): Observable<Cell> {
    if (selectedCell.hasMine) {
      return of({ ...selectedCell, status: MineStatus.Mine });
    }

    return of({
      ...selectedCell,
      status: this.getStatus(selectedCell),
    });
  }

  getMinesInNeighborhood(selectedCell: Cell): number {
    let totalMines = 0;
    if (
      this.isCellValid(selectedCell.xPos - 1, selectedCell.yPos) &&
      this.realCells[selectedCell.xPos - 1][selectedCell.yPos].hasMine
    ) {
      totalMines++;
    }
    if (
      this.isCellValid(selectedCell.xPos + 1, selectedCell.yPos) &&
      this.realCells[selectedCell.xPos + 1][selectedCell.yPos].hasMine
    ) {
      totalMines++;
    }
    if (
      this.isCellValid(selectedCell.xPos, selectedCell.yPos + 1) &&
      this.realCells[selectedCell.xPos][selectedCell.yPos + 1].hasMine
    ) {
      totalMines++;
    }
    if (
      this.isCellValid(selectedCell.xPos, selectedCell.yPos - 1) &&
      this.realCells[selectedCell.xPos][selectedCell.yPos - 1].hasMine
    ) {
      totalMines++;
    }
    if (
      this.isCellValid(selectedCell.xPos - 1, selectedCell.yPos + 1) &&
      this.realCells[selectedCell.xPos - 1][selectedCell.yPos + 1].hasMine
    ) {
      totalMines++;
    }
    if (
      this.isCellValid(selectedCell.xPos - 1, selectedCell.yPos - 1) &&
      this.realCells[selectedCell.xPos - 1][selectedCell.yPos - 1].hasMine
    ) {
      totalMines++;
    }
    if (
      this.isCellValid(selectedCell.xPos + 1, selectedCell.yPos + 1) &&
      this.realCells[selectedCell.xPos + 1][selectedCell.yPos + 1].hasMine
    ) {
      totalMines++;
    }
    if (
      this.isCellValid(selectedCell.xPos + 1, selectedCell.yPos - 1) &&
      this.realCells[selectedCell.xPos + 1][selectedCell.yPos - 1].hasMine
    ) {
      totalMines++;
    }

    return totalMines;
  }

  isCellValid(row: number, column: number) {
    return row >= 0 && row < this.height && column >= 0 && column < this.width;
  }

  getStatus(selectedCell: Cell): MineStatus {
    switch (this.getMinesInNeighborhood(selectedCell)) {
      case 1:
        return MineStatus.Neighbor1;
      case 2:
        return MineStatus.Neighbor2;
      case 3:
        return MineStatus.Neighbor3;
      case 4:
        return MineStatus.Neighbor4;
      case 5:
        return MineStatus.Neighbor5;
      case 6:
        return MineStatus.Neighbor6;
      case 7:
        return MineStatus.Neighbor7;
      case 8:
        return MineStatus.Neighbor8;
    }
    return MineStatus.None;
  }
}
