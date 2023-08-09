import { TestBed } from "@angular/core/testing";

import { GameService } from "./game.service";
import { initialAppState as initialState } from "../state/app.reducer";
import { provideMockStore } from "@ngrx/store/testing";
import { Cell, MineStatus } from "../models/cell.model";
import { mockCell } from "../utils/mock-cell";

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

  describe("handleLeftClick", () => {
    it("should return the cell unchanged if its status is Flagged", (done) => {
      const unchangedCell: Cell = {
        ...mockCell,
        status: MineStatus.Flagged,
      };

      service.handleLeftClick(unchangedCell).subscribe((cell) => {
        expect(cell).toEqual(unchangedCell);
        done();
      });
    });

    it("should return the cell with status Mine if cell has a mine", (done) => {
      const mineCell: Cell = {
        ...mockCell,
        hasMine: true,
      };

      const expectedCell = { ...mineCell, status: MineStatus.Mine };

      service.handleLeftClick(mineCell).subscribe((cell) => {
        expect(cell).toEqual(expectedCell);
        done();
      });
    });
  });

  describe("handleRightClick", () => {
    it("should return the cell with status Flagged if its status is Pristine", (done) => {
      const pristineCell: Cell = {
        ...mockCell,
        status: MineStatus.Pristine,
      };

      const expectedCell = { ...mockCell, status: MineStatus.Flagged };

      service.handleRightClick(pristineCell).subscribe((cell) => {
        expect(cell).toEqual(expectedCell);
        done();
      });
    });

    it("should return the cell with status Pristine if its status is Flagged", (done) => {
      const flaggedCell: Cell = {
        ...mockCell,
        status: MineStatus.Flagged,
      };

      const expectedCell = { ...flaggedCell, status: MineStatus.Pristine };

      service.handleRightClick(flaggedCell).subscribe((cell) => {
        expect(cell).toEqual(expectedCell);
        done();
      });
    });

    it("should return the cell unchanged for other statuses", (done) => {
      service.handleRightClick(mockCell).subscribe((cell) => {
        expect(cell).toEqual(mockCell);
        done();
      });
    });
  });

  describe("isCellValid", () => {
    beforeEach(() => {
      service.height = 9;
      service.width = 9;
    });

    it("should return true for valid rows and columns", () => {
      expect(service.isCellValid(0, 0)).toBeTruthy();
      expect(service.isCellValid(8, 8)).toBeTruthy();
    });

    it("should return false for rows less than 0 or columns less than 0", () => {
      expect(service.isCellValid(-1, 5)).toBeFalsy();
      expect(service.isCellValid(5, -1)).toBeFalsy();
      expect(service.isCellValid(-1, -1)).toBeFalsy();
    });

    it("should return false for rows equal to or greater than height or columns equal to or greater than width", () => {
      expect(service.isCellValid(9, 5)).toBeFalsy();
      expect(service.isCellValid(5, 9)).toBeFalsy();
      expect(service.isCellValid(9, 9)).toBeFalsy();
      expect(service.isCellValid(10, 10)).toBeFalsy();
    });
  });
});
