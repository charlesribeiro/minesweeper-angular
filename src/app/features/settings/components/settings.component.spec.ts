import { ComponentFixture, TestBed } from "@angular/core/testing";
import { initialAppState as initialState } from "../../../state/app.reducer";

import { SettingsComponent } from "./settings.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Level } from "../../../models/level.model";
import { IApp } from "../../../state/app.interface";
import * as fromAppActions from "../../../state/app.actions";
import { mockSettings } from "../../../utils/mock-settings";

describe("SettingsComponent", () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: MockStore<IApp>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SettingsComponent],
      providers: [provideMockStore({ initialState })],
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    component.form = new FormGroup({
      m: new FormControl(),
      n: new FormControl(),
      totalMines: new FormControl(),
    });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set form with correct default values", () => {
    component.setForm(mockSettings);

    expect(component.form.controls["n"].value).toEqual(mockSettings.height);
    expect(component.form.controls["m"].value).toEqual(mockSettings.width);
  });

  it("should dispatch setSettings action with form values", () => {
    jest.spyOn(store, "dispatch");
    component.form.setValue({
      m: 10,
      n: 8,
      totalMines: 5,
    });
    component.saveForm();

    const expectedSettings = {
      level: Level.Easy,
      width: 10,
      height: 8,
      totalMines: 5,
    };

    expect(store.dispatch).toHaveBeenCalledWith(
      fromAppActions.setSettings({ settings: expectedSettings }),
    );
  });
});
