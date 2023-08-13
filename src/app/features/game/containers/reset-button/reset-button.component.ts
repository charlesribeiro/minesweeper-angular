import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Cell } from "../../../../models/cell.model";
import { GameStatus } from "../../../../models/gameStatus.model";

@Component({
  selector: "app-reset-button",
  templateUrl: "./reset-button.component.html",
  styleUrls: ["./reset-button.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetButtonComponent {
  @Output() rightClick = new EventEmitter<Cell>();
  @Input() gameStatus: GameStatus;
  readonly GAMESTATUS = GameStatus;

  get icon(): string {
    switch (this.gameStatus) {
      case this.GAMESTATUS.WON:
        return "😎";
      case this.GAMESTATUS.LOST:
        return "😵";
      default:
        return "🙂";
    }
  }

  resetAndPreventDefault(): boolean {
    this.rightClick.emit();
    return false;
  }
}
