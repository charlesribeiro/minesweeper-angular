import { ComponentFixture, TestBed } from "@angular/core/testing";
import { initialAppState as initialState } from "../../../../state/app.reducer";
import { MainGameComponent } from "./main-game.component";
import { provideMockStore } from "@ngrx/store/testing";

describe("MainGameComponent", () => {
  let component: MainGameComponent;
  let fixture: ComponentFixture<MainGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainGameComponent],
      providers: [provideMockStore({ initialState })],
    });
    fixture = TestBed.createComponent(MainGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
