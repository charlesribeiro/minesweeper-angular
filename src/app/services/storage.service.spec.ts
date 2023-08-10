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

  describe("saveCache", () => {
    it('should save value to localStorage with provided key prefixed by "minesweeper "', () => {
      const key = "testKey";
      const value = ["testValue1", "testValue3"];

      service.saveCache(key, value);

      const storedValue = localStorage.getItem("minesweeper " + key);
      expect(storedValue).toEqual(JSON.stringify(value));
    });
  });
});
