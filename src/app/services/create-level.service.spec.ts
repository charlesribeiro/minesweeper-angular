import { TestBed } from "@angular/core/testing";
import { CreateLevelService } from "./create-level.service";
import { provideMockStore } from "@ngrx/store/testing";
import { initialAppState as initialState } from "../state/app.reducer";
import { mockCell } from "../utils/mock-cell";
import { Cell } from "../models/cell.model";
import { fisherYatesShuffle } from "../utils/fisher-yates-shuffle";

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

  describe("createMatrix", () => {
    beforeEach(() => {
      service.height = 5;
      service.width = 5;
    });

    it("should generate a 2D array with the correct dimensions", (done) => {
      service.createMatrix().subscribe((board) => {
        expect(board.length).toBe(service.height);
        board.forEach((row) => {
          expect(row.length).toBe(service.width);
        });
        done();
      });
    });

    it("should generate valid cells for each position in the 2D array", (done) => {
      service.createMatrix().subscribe((board) => {
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

  describe("setCoordinates", () => {
    it("should set the correct coordinates for a cell", () => {
      const result = service.setCoordinates({ ...mockCell }, 2, 3);
      expect(result.xPos).toEqual(2);
      expect(result.yPos).toEqual(3);
    });
  });

  describe("fisherYatesShuffle", () => {
    it("should shuffle an array of cells", () => {
      const cells: Cell[] = [mockCell, mockCell, mockCell];
      const shuffledCells = fisherYatesShuffle(
        [...cells],
        service.height,
        service.width,
      );
      expect(shuffledCells.length).toEqual(cells.length);
    });
  });

  describe("generateArrayOfMineCells", () => {
    beforeEach(() => {
      service.height = 2;
      service.width = 2;
      service.totalMines = 2;
    });
    it("should generate an array of mine cells", () => {
      const cells = service.generateArrayOfMineCells([]);
      expect(cells.length).toEqual(service.height * service.width);

      const mineCells = cells.filter((cell) => cell.hasMine);
      expect(mineCells.length).toEqual(service.totalMines);
    });
  });
});
