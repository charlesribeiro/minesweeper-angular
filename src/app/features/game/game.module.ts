import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CellComponent } from "./containers/cell/cell.component";
import { ResetButtonComponent } from "./containers/reset-button/reset-button.component";
import { SevenSegmentDisplayComponent } from "./containers/seven-segment/seven-segment-display.component";
import { MainGameComponent } from "./components/main-game/main-game.component";
import { BoardComponent } from "./containers/board/board.component";

@NgModule({
  declarations: [
    CellComponent,
    SevenSegmentDisplayComponent,
    ResetButtonComponent,
    CellComponent,
    MainGameComponent,
    BoardComponent,
  ],
  imports: [CommonModule],
  exports: [
    CellComponent,
    SevenSegmentDisplayComponent,
    ResetButtonComponent,
    CellComponent,
    MainGameComponent,
    BoardComponent,
  ],
})
export class GameModule {}
