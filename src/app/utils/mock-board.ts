import { Cell } from "../models/cell.model";
import {
  mockCell,
  mockCellWith1MineNeighbor,
  mockCellWithFlag,
  mockPristineCellWithoutMine,
} from "./mock-cell";

export const mockBoard: Cell[][] = [
  [mockCell, mockCell],
  [mockCell, mockCell],
];

export const mock3x3BoardWith8Mines: Cell[][] = [
  [mockCell, mockCell, mockCell],
  [mockCell, mockPristineCellWithoutMine, mockCell],
  [mockCell, mockCell, mockCell],
];

export const mock3x3BoardWith0Mines: Cell[][] = [
  [
    mockPristineCellWithoutMine,
    mockPristineCellWithoutMine,
    mockPristineCellWithoutMine,
  ],
  [
    mockPristineCellWithoutMine,
    mockPristineCellWithoutMine,
    mockPristineCellWithoutMine,
  ],
  [
    mockPristineCellWithoutMine,
    mockPristineCellWithoutMine,
    mockPristineCellWithoutMine,
  ],
];

export const mock3x3BoardGameWon: Cell[][] = [
  [
    mockCellWith1MineNeighbor,
    mockCellWith1MineNeighbor,
    mockCellWith1MineNeighbor,
  ],
  [mockCellWith1MineNeighbor, mockCellWithFlag, mockCellWith1MineNeighbor],
  [
    mockCellWith1MineNeighbor,
    mockCellWith1MineNeighbor,
    mockCellWith1MineNeighbor,
  ],
];

export const mock3x3BoardGameInProgress: Cell[][] = [
  [
    mockCellWith1MineNeighbor,
    mockCellWith1MineNeighbor,
    mockCellWith1MineNeighbor,
  ],
  [mockCellWith1MineNeighbor, mockCellWithFlag, mockPristineCellWithoutMine],
  [
    mockCellWith1MineNeighbor,
    mockCellWith1MineNeighbor,
    mockCellWith1MineNeighbor,
  ],
];
