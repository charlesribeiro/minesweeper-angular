import { Component, OnInit } from "@angular/core";
import { saveAs } from "file-saver";
import * as fromAppSelectors from "../../../../state/app.selectors";
import * as fromAppActions from "../../../../state/app.actions";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { IApp } from "src/app/state/app.interface";
import { Store } from "@ngrx/store";
import { PlayerBoard } from "src/app/models/playerBoard.model";

@UntilDestroy()
@Component({
  selector: "app-save-and-load",
  templateUrl: "./save-and-load.component.html",
})
export class SaveAndLoadComponent implements OnInit {
  playerBoardFromState: PlayerBoard;
  playerBoardFromDesktop: PlayerBoard;

  constructor(private store: Store<IApp>) {}
  ngOnInit(): void {
    this.store
      .select(fromAppSelectors.selectPlayerBoard)
      .pipe(untilDestroyed(this))
      .subscribe(
        (playerBoard: PlayerBoard) => (this.playerBoardFromState = playerBoard),
      );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          this.playerBoardFromDesktop = JSON.parse(
            e.target?.result as unknown as string,
          );
        } catch (err) {
          console.error("Error parsing JSON:", err);
          alert("Invalid save file.");
        }
      };

      reader.readAsText(file);
    }
  }

  savePlayerBoard(): boolean {
    if (this.playerBoardFromState) {
      const blob = new Blob([JSON.stringify(this.playerBoardFromState)], {
        type: "application/json",
      });
      saveAs(blob, "playerBoard.json");
    }
    return false;
  }

  proceedWithLoadingState(): boolean {
    this.store.dispatch(
      fromAppActions.loadStateFromFile({
        playerBoard: this.playerBoardFromDesktop,
      }),
    );
    return false;
  }
}
