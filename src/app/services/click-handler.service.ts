import { Injectable } from "@angular/core";
import * as fromAppSelectors from "../state/app.selectors";
import { Level } from "../models/level.model";
import { Cell, MineStatus } from "../models/cell.model";
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { IApp } from "../state/app.interface";
import { neighborOffsets } from "../utils/neighbor-offsets";
import { CellPosition } from "../models/cellPosition.model";

@Injectable({
  providedIn: "root",
})
export class ClickHandlerService {
  private level: Level;

  width: number;
  height: number;

  realCells: Cell[][];

  revealedCells: Cell[];
  private visitedCells = new Set<string>();

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
      .select(fromAppSelectors.selectRealBoard)
      .subscribe((realCells: Cell[][]) => (this.realCells = realCells));
  }

  handleLeftClick(selectedCell: Cell): Observable<Cell[]> {
    if (selectedCell.status === MineStatus.Flagged) {
      return of([selectedCell]);
    }

    if (selectedCell.hasMine) {
      return of([{ ...selectedCell, status: MineStatus.Mine }]);
    }

    this.revealedCells = [];

    this.deepSearchFirst(selectedCell);

    return of(this.revealedCells);
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

  getMinesInNeighborhood(cellPosition: CellPosition): number {
    return neighborOffsets.reduce(
      (totalMines, [xOffset, yOffset]: CellPosition) => {
        const newX = cellPosition[0] + xOffset;
        const newY = cellPosition[1] + yOffset;

        if (
          this.isCellValid(newX, newY) &&
          this.realCells[newX][newY].hasMine
        ) {
          return totalMines + 1;
        }

        return totalMines;
      },
      0,
    );
  }

  isCellValid(row: number, column: number) {
    return row >= 0 && row < this.height && column >= 0 && column < this.width;
  }

  deepSearchFirst(cell: Cell) {
    const positionKey = `${cell.xPos},${cell.yPos}`;

    if (this.visitedCells.has(positionKey)) {
      return;
    }

    this.visitedCells.add(positionKey);

    const status = this.getMinesInNeighborhood([cell.xPos, cell.yPos]);

    this.revealedCells.push({
      ...cell,
      status,
    });

    if (status === MineStatus.None) {
      for (const [xOffset, yOffset] of neighborOffsets) {
        const newX = cell.xPos + xOffset;
        const newY = cell.yPos + yOffset;

        if (this.isCellValid(newX, newY)) {
          this.deepSearchFirst(this.realCells[newX][newY]);
        }
      }
    }
  }
}
