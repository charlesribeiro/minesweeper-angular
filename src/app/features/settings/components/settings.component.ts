import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { IApp } from "../../../state/app.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Settings } from "src/app/models/settings.model";
import * as fromAppSelectors from "../../../state/app.selectors";
import * as fromAppActions from "../../../state/app.actions";
import { Level } from "src/app/models/level.model";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  settings$: Observable<Settings>;

  constructor(
    private store: Store<IApp>,
    private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    this.store.select(fromAppSelectors.selectSettings).subscribe((settings) => {
      this.form = this.fb.group({
        n: [
          settings.height,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(2),
          ],
        ],
        m: [
          settings.width,
          [
            Validators.required,
            Validators.minLength(1),
            Validators.minLength(2),
          ],
        ],
        totalMines: [
          settings.width,
          [Validators.required, Validators.minLength(0)],
        ],
      });
      console.log(settings);
    });
  }

  // form = this.fb.group({
  //   n: [
  //     9,
  //     {
  //       validators: [Validators.required, Validators.minLength(0)],
  //     },
  //   ],
  //   m: [9, [Validators.required, Validators.minLength(0)]],
  // });

  buildForm() {}

  saveForm(): void {
    console.log(this.form.controls["totalMines"].value);
    let settings: Settings = {
      level: Level.Easy,
      width: this.form.controls["m"].value,
      height: this.form.controls["n"].value,
      totalMines: this.form.controls["totalMines"].value,
    };
    debugger;

    this.store.dispatch(fromAppActions.setSettings({ settings }));
  }
}
