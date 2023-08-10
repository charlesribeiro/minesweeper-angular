import { TestBed } from "@angular/core/testing";
import { CreateLevelService } from "./create-level.service";
import { provideMockStore } from "@ngrx/store/testing";
import { initialAppState as initialState } from "../state/app.reducer";
import { MineStatus } from "../models/cell.model";
import { Level } from "../models/level.model";

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

  describe("generateRandomCell", () => {
    it("should generate a cell with given xPos and yPos", () => {
      const cell = service.generateRandomCell(1, 2);
      expect(cell.xPos).toBe(1);
      expect(cell.yPos).toBe(2);
      expect(cell.status).toBe(MineStatus.Pristine);
    });

    it("should generate a cell with a mine based on controlled randomness", () => {
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(0);
      service.level = Level.Easy;

      const cell = service.generateRandomCell(1, 2);

      expect(cell.hasMine).toBe(true);

      Math.random = originalRandom;
    });

    it("should generate a cell without a mine based on controlled randomness", () => {
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(1);
      service.level = Level.Easy;

      const cell = service.generateRandomCell(1, 2);

      expect(cell.hasMine).toBe(false);

      Math.random = originalRandom;
    });
  });
});
