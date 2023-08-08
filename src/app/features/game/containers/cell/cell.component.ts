import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-cell",
  templateUrl: "./cell.component.html",
  styleUrls: ["./cell.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {}
