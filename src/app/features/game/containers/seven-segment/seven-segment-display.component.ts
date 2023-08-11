import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from "@angular/core";

@Component({
  selector: "app-seven-segment-display",
  templateUrl: "./seven-segment-display.component.html",
  styleUrls: ["./seven-segment-display.component.sass"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SevenSegmentDisplayComponent implements OnChanges {
  @Input() value: number;
  display: string;

  ngOnChanges() {
    this.formatNumber();
  }

  formatNumber() {
    if (this.value >= 0 && this.value < 1000) {
      this.display = this.value.toString().padStart(3, "0");
    } else {
      this.display = "EEE";
    }
  }
}
