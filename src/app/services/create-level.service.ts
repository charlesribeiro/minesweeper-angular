import { Injectable } from "@angular/core";
import { Cell, MineStatus } from "../models/cell.model";
import * as fromSettingsSelectors from "../../app/features/settings/store/settings.selectors";

import { Level } from "../models/level.model";
import { Observable, of } from "rxjs";
import { IApp } from "../state/app.interface";
import { Store } from "@ngrx/store";
import { fisherYatesShuffle } from "../utils/fisher-yates-shuffle";

@Injectable({
  providedIn: "root",
})
export class CreateLevelService {
  level: Level;
  width: number;
  height: number;

  totalMines: number;

  constructor(private readonly store: Store<IApp>) {
    this.store
      .select(fromSettingsSelectors.selectSettingsLevel)
      .subscribe((level: Level) => (this.level = level));

    this.store
      .select(fromSettingsSelectors.selectGridHeight)
      .subscribe((height: number) => (this.height = height));

    this.store
      .select(fromSettingsSelectors.selectGridWidth)
      .subscribe((width: number) => (this.width = width));

    this.store
      .select(fromSettingsSelectors.selectSettingsTotalMines)
      .subscribe((totalMines: Level) => (this.totalMines = totalMines));
  }

  generateRandomCell(hasMine = false): Cell {
    return {
      hasMine: hasMine,
      xPos: 0,
      yPos: 0,
      status: MineStatus.Pristine,
    };
  }

  setCoordinates(cell: Cell, xPos: number, yPos: number): Cell {
    cell.xPos = xPos;
    cell.yPos = yPos;
    return cell;
  }

  createMatrix(): Observable<Cell[][]> {
    const cells: Cell[] = [];

    this.generateArrayOfMineCells(cells);
    fisherYatesShuffle(cells, this.height, this.width);

    return of(this.generateBoard(cells));
  }

  generateArrayOfMineCells(cells: Cell[]): Cell[] {
    for (let i = 0; i < this.height * this.width; i++) {
      const hasMine = i < this.totalMines;
      cells.push(this.generateRandomCell(hasMine));
    }
    return cells;
  }

  generateBoard(cells: Cell[]): Cell[][] {
    const randomBoard: Cell[][] = [];
    for (let i = 0; i < this.height; i++) {
      randomBoard[i] = [];
      for (let j = 0; j < this.width; j++) {
        randomBoard[i][j] = this.setCoordinates(
          cells[i * this.width + j],
          i,
          j,
        );
      }
    }
    return randomBoard;
  }
}
