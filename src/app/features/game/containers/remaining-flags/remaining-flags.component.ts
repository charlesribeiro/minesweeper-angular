import { Component, Input } from "@angular/core";

@Component({
  selector: "app-remaining-flags",
  templateUrl: "./remaining-flags.component.html",
  styleUrls: ["./remaining-flags.component.sass"],
})
export class RemainingFlagsComponent {
  @Input() flagsLeft: number;
}
