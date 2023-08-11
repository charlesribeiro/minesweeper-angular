import { ComponentFixture, TestBed } from "@angular/core/testing";
import { initialAppState as initialState } from "../../../state/app.reducer";

import { SettingsComponent } from "./settings.component";
import { provideMockStore } from "@ngrx/store/testing";

describe("SettingsComponent", () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
      providers: [provideMockStore({ initialState })],
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
