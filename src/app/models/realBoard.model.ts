import { Cell } from "./cell.model";

export interface RealBoard {
  entities: Cell[][];
  loading: boolean;
  error: boolean;
}
