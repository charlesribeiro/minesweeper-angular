import {
  ComponentFixture,
  TestBed,
  tick,
  waitForAsync,
} from "@angular/core/testing";
import { initialAppState as initialState } from "../../../../state/app.reducer";
import { SaveAndLoadComponent } from "./save-and-load.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { IApp } from "src/app/state/app.interface";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { mockBoard } from "../../../../utils/mock-board";
import * as fromAppSelectors from "../../../../state/app.selectors";
import * as fromAppActions from "../../../../state/app.actions";
import * as saveAs from "file-saver";

describe("SaveAndLoadComponent", () => {
  let component: SaveAndLoadComponent;
  let fixture: ComponentFixture<SaveAndLoadComponent>;
  let store: MockStore<IApp>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SaveAndLoadComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAndLoadComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(fromAppSelectors.selectPlayerBoard, {
      ...initialState.playerBoard,
      entities: mockBoard,
    });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should correctly read the playerBoard from the store on initialization", () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.playerBoardFromState).toEqual({
      ...initialState.playerBoard,
      entities: mockBoard,
    });
  });

  it("should dispatch loadStateFromFile action with playerBoardFromDesktop", () => {
    jest.spyOn(store, "dispatch");
    component.playerBoardFromDesktop = {
      ...initialState.playerBoard,
      entities: mockBoard,
    };

    component.proceedWithLoadingState();

    expect(store.dispatch).toHaveBeenCalledWith(
      fromAppActions.loadStateFromFile({
        playerBoard: component.playerBoardFromDesktop,
      }),
    );
  });
});
