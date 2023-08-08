import { Board } from "../models/board.model";

// import { CharData } from "../app/models/characterData.interface";
export interface StoreList<T> {
  entities: T[];
  loading: boolean;
  error: boolean;
}

export const storeListInitialState: StoreList<Board> = {
  entities: [],
  loading: false,
  error: false,
};
