import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { initialAppState as initialState } from "../../../../state/app.reducer";
import { SaveAndLoadComponent } from "./save-and-load.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { IApp } from "src/app/state/app.interface";

describe("SaveAndLoadComponent", () => {
  let component: SaveAndLoadComponent;
  let fixture: ComponentFixture<SaveAndLoadComponent>;
  let store: MockStore<IApp>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SaveAndLoadComponent],
      providers: [provideMockStore({ initialState })],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAndLoadComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
