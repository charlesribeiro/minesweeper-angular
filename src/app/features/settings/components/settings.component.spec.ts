import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { initialAppState as initialState } from "../../../state/app.reducer";

import { SettingsComponent } from "./settings.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { IApp } from "../../../state/app.interface";
import * as fromSettingsActions from "../../settings/store/settings.actions";
import * as fromSettingsSelectors from "../../settings/store/settings.selectors";

import { mockSettings } from "../../../utils/mock-settings";
import { Settings } from "src/app/models/settings.model";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { Level } from "../../../models/level.model";
import { predefinedLevels } from "../../../utils/predefinedLevels";

describe("SettingsComponent", () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: MockStore<IApp>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SettingsComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(fromSettingsSelectors.selectSettings, mockSettings);

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize form with settings from store", () => {
    const widthControl = component.form.controls["width"];
    const heightControl = component.form.controls["height"];
    const totalMinesControl = component.form.controls["totalMines"];

    expect(widthControl.value).toEqual(10);
    expect(heightControl.value).toEqual(8);
    expect(totalMinesControl.value).toEqual(5);
  });

  it("should dispatch setSettings action with form values when saveForm is called", () => {
    jest.spyOn(store, "dispatch");
    const newSettings: Settings = {
      ...mockSettings,
      level: Level.Custom,
    };

    component.form.controls["width"].setValue(mockSettings.width);
    component.form.controls["height"].setValue(mockSettings.height);
    component.form.controls["totalMines"].setValue(mockSettings.totalMines);

    component.saveForm();

    expect(store.dispatch).toHaveBeenCalledWith(
      fromSettingsActions.setSettings({ settings: newSettings }),
    );
  });

  it("should dispatch the correct setSettings for each level", () => {
    jest.spyOn(store, "dispatch");
    Object.values(Level).forEach((level) => {
      if (typeof level === "number") {
        component.startPreMadeLevel(level);

        expect(store.dispatch).toHaveBeenCalledWith(
          fromSettingsActions.setSettings({
            settings: predefinedLevels[level],
          }),
        );
      }
    });
  });
});
