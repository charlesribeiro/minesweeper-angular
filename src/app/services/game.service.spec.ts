import { TestBed } from "@angular/core/testing";

import { GameService } from "./game.service";
import { initialAppState as initialState } from "../state/app.reducer";
import { provideMockStore } from "@ngrx/store/testing";

describe("GameService", () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService, provideMockStore({ initialState })],
    });
    service = TestBed.inject(GameService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
