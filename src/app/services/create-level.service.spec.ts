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

  describe("generate2DCellArray", () => {
    beforeEach(() => {
      service.height = 5;
      service.width = 5;
    });

    it("should generate a 2D array with the correct dimensions", (done) => {
      service.generate2DCellArray().subscribe((board) => {
        expect(board.length).toBe(service.height);
        board.forEach((row) => {
          expect(row.length).toBe(service.width);
        });
        done();
      });
    });

    it("should generate valid cells for each position in the 2D array", (done) => {
      service.generate2DCellArray().subscribe((board) => {
        board.forEach((row, i) => {
          row.forEach((cell, j) => {
            expect(cell.xPos).toBe(i);
            expect(cell.yPos).toBe(j);
          });
        });
        done();
      });
    });
  });
});
