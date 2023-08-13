import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { initialAppState as initialState } from "../../../state/app.reducer";

import { SettingsComponent } from "./settings.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { IApp } from "../../../state/app.interface";
import * as fromAppActions from "../../../state/app.actions";
import * as fromAppSelectors from "../../../state/app.selectors";

import { mockSettings } from "../../../utils/mock-settings";
import { Settings } from "src/app/models/settings.model";

describe("SettingsComponent", () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let store: MockStore<IApp>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SettingsComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    component = fixture.componentInstance;
    store.overrideSelector(fromAppSelectors.selectSettings, mockSettings);

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
      width: 80,
    };

    component.form.controls["width"].setValue(newSettings.width);
    component.form.controls["height"].setValue(newSettings.height);
    component.form.controls["totalMines"].setValue(newSettings.totalMines);

    component.saveForm();

    expect(store.dispatch).toHaveBeenCalledWith(
      fromAppActions.setSettings({ settings: newSettings }),
    );
  });
});
