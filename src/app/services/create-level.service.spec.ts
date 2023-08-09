import { TestBed } from "@angular/core/testing";

import { CreateLevelService } from "./create-level.service";
import { provideMockStore } from "@ngrx/store/testing";
import { initialAppState as initialState } from "../state/app.reducer";

describe("CreateLevelService", () => {
  let service: CreateLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateLevelService, provideMockStore({ initialState })],
    });
    service = TestBed.inject(CreateLevelService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
