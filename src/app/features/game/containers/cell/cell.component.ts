import { trigger, transition, style, animate } from "@angular/animations";
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from "@angular/core";
import { Cell } from "src/app/models/cell.model";

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.sass"],
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms", style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CellComponent {
  @Input() cell: Cell;
  @Output() rightClick = new EventEmitter<Cell>();
  @Output() leftClick = new EventEmitter<Cell>();

  get imagePath(): string {
    return `/assets/MINESWEEPER_${this.cell.status}.png`;
  }

  @HostListener("contextmenu")
  addFlagAndPreventDefaultContextMenu() {
    this.rightClick.emit(this.cell);
    return false;
  }

  @HostListener("click")
  clickOnMine() {
    this.leftClick.emit(this.cell);
  }
}