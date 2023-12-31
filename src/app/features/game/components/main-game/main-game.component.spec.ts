import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { initialAppState as initialState } from "../../../../state/app.reducer";
import { MainGameComponent } from "./main-game.component";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { mockCell } from "../../../../utils/mock-cell";
import * as fromAppActions from "../../../../state/app.actions";
import { IApp } from "../../../../state/app.interface";
import { mockBoard } from "../../../../utils/mock-board";
import { TimerService } from "../../../../services/timer.service";
import { StorageService } from "../../../../services/storage.service";

describe("MainGameComponent", () => {
  let component: MainGameComponent;
  let fixture: ComponentFixture<MainGameComponent>;
  let store: MockStore<IApp>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainGameComponent],
      providers: [
        provideMockStore({ initialState }),
        StorageService,
        TimerService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGameComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.setState({
      ...initialState,
      playerBoard: {
        ...initialState.playerBoard,
        entities: mockBoard,
      },
    });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("rightClick", () => {
    it("should dispatch the setRightClick action with the provided cell", () => {
      jest.spyOn(store, "dispatch");
      component.rightClick(mockCell);

      expect(store.dispatch).toHaveBeenCalledWith(
        fromAppActions.setRightClick({ cell: mockCell }),
      );
    });
  });

  describe("leftClick", () => {
    it("should dispatch the setLeftClick action with the provided cell", () => {
      jest.spyOn(store, "dispatch");
      component.leftClick(mockCell);

      expect(store.dispatch).toHaveBeenCalledWith(
        fromAppActions.setLeftClick({ cell: mockCell }),
      );
    });
  });

  describe("reset", () => {
    it("should dispatch the resetGame action", () => {
      jest.spyOn(store, "dispatch");
      component.reset();

      expect(store.dispatch).toHaveBeenCalledWith(fromAppActions.resetGame());
    });
  });
});
