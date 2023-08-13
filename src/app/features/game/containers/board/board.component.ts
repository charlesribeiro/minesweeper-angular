import { Component, EventEmitter, Input, Output } from "@angular/core";
import { GameStatus } from "../../../../models/gameStatus.model";
import { Cell } from "../../../../models/cell.model";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.sass"],
})
export class BoardComponent {
  @Input() cells: Cell[][];
  @Input() gameStatus: GameStatus;
  @Output() rightClick = new EventEmitter<Cell>();
  @Output() leftClick = new EventEmitter<Cell>();

  readonly GAMESTATUS = GameStatus;
}
