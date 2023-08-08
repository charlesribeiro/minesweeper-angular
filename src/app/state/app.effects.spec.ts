import { Action } from "@ngrx/store";
import { AppEffects } from "./app.effects";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { initialAppState as initialState } from "../state/app.reducer";
import { Observable } from "rxjs";
import { provideMockActions } from "@ngrx/effects/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { TestBed } from "@angular/core/testing";

describe("AppEffects", () => {
  let actions$: Observable<Action>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
      ],
    });
  });

  beforeEach(() => {
    effects = TestBed.inject<AppEffects>(AppEffects);
  });

  it("should be created", () => {
    expect(effects).toBeTruthy();
  });
});
