/* eslint-disable no-unused-vars */
import { Injectable } from "@angular/core";
import { Cell, MineStatus } from "../models/cell.model";
import * as fromAppSelectors from "../state/app.selectors";
import { Level } from "../models/level.model";
import { Observable, of } from "rxjs";
import { IApp } from "../state/app.interface";
import { Store } from "@ngrx/store";

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
      .select(fromAppSelectors.selectSettingsLevel)
      .subscribe((level: Level) => (this.level = level));

    this.store
      .select(fromAppSelectors.selectGridHeight)
      .subscribe((height: number) => (this.height = height));

    this.store
      .select(fromAppSelectors.selectGridWidth)
      .subscribe((width: number) => (this.width = width));

    this.store
      .select(fromAppSelectors.selectSettingsTotalMines)
      .subscribe((totalMines: Level) => (this.totalMines = totalMines));
  }

  generateRandomCell(hasMine: boolean = false): Cell {
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
    this.fisherYatesShuffle(cells);

    return of(this.generateBoard(cells));
  }

  fisherYatesShuffle(cells: Cell[]): Cell[] {
    for (let i = this.height * this.width - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    return cells;
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
