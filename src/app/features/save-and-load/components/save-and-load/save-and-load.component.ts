import { Component, OnInit } from "@angular/core";
import saveAs from "file-saver";
import * as fromAppSelectors from "../../../../state/app.selectors";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Cell } from "src/app/models/cell.model";
import { IApp } from "src/app/state/app.interface";
import { Store } from "@ngrx/store";
import { PlayerBoard } from "src/app/models/playerBoard.model";

@UntilDestroy()
@Component({
  selector: "app-save-and-load",
  templateUrl: "./save-and-load.component.html",
  styleUrls: ["./save-and-load.component.sass"],
})
export class SaveAndLoadComponent implements OnInit {
  playerBoard: PlayerBoard;

  constructor(private store: Store<IApp>) {}
  ngOnInit(): void {
    this.store
      .select(fromAppSelectors.selectPlayerBoard)
      .pipe(untilDestroyed(this))
      .subscribe(
        (playerBoard: PlayerBoard) => (this.playerBoard = playerBoard),
      );
  }
  jsonData: any;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          debugger;
          const uploadedSave: PlayerBoard = e.target.result;
          this.jsonData = JSON.parse(e.target.result);
        } catch (err) {
          console.error("Error parsing JSON:", err);
          alert("Invalid JSON file.");
        }
      };

      reader.readAsText(file);
    }
  }

  savePlayerBoard() {
    if (this.playerBoard) {
      const blob = new Blob([JSON.stringify(this.playerBoard)], {
        type: "application/json",
      });
      saveAs(blob, "playerBoard.json");
    }
  }
}
