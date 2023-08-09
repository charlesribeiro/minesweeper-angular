import { ComponentFixture, TestBed } from "@angular/core/testing";
import { initialAppState as initialState } from "../../../../state/app.reducer";
import { MainGameComponent } from "./main-game.component";
import { provideMockStore } from "@ngrx/store/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { StorageService } from "../../../../services/storage.service";

describe("MainGameComponent", () => {
  let component: MainGameComponent;
  let fixture: ComponentFixture<MainGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainGameComponent],
      providers: [provideMockStore({ initialState }), StorageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(MainGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
