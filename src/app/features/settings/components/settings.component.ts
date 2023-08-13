import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IApp } from "../../../state/app.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Settings } from "src/app/models/settings.model";
import * as fromAppSelectors from "../../../state/app.selectors";
import * as fromAppActions from "../../../state/app.actions";
import { Level } from "../../../models/level.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.html"],
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  settings$: Observable<Settings>;

  constructor(
    private store: Store<IApp>,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromAppSelectors.selectSettings)
      .pipe(untilDestroyed(this))
      .subscribe((settings) => this.initForm(settings));
  }

  initForm(settings: Settings): void {
    this.form = this.fb.group({
      width: [settings.width, [Validators.required, Validators.min(9)]],
      height: [settings.height, [Validators.required, Validators.min(9)]],
      totalMines: [
        settings.totalMines,
        [Validators.required, Validators.min(3)],
      ],
    });
  }

  saveForm(): void {
    const settings: Settings = {
      level: Level.Easy,
      width: this.form.controls["width"].value,
      height: this.form.controls["height"].value,
      totalMines: this.form.controls["totalMines"].value,
    };

    this.store.dispatch(fromAppActions.setSettings({ settings }));
  }
}
