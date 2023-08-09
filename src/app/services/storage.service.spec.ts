import { TestBed } from "@angular/core/testing";

import { StorageService } from "./storage.service";
import { provideMockStore } from "@ngrx/store/testing";
import { initialAppState as initialState } from "../state/app.reducer";

describe("StorageService", () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService, provideMockStore({ initialState })],
    });
    service = TestBed.inject(StorageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
