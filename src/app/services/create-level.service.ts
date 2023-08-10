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
  }

  generateRandomCell(xPos: number, yPos: number): Cell {
    return {
      hasMine: Math.random() < 0.05 * this.level,
      xPos: xPos,
      yPos: yPos,
      status: MineStatus.Pristine,
    };
  }

  createMatrix(): Observable<Cell[][]> {
    const randomBoard: Cell[][] = [];

    for (let i = 0; i < this.height; i++) {
      randomBoard[i] = [];
      for (let j = 0; j < this.width; j++) {
        randomBoard[i][j] = this.generateRandomCell(i, j);
      }
    }

    return of(randomBoard);
  }
}
