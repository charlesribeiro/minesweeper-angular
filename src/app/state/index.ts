import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppReducer } from "./app.reducer";
import { IAppState } from "./app.interface";

export const reducers: ActionReducerMap<IAppState> = {
  AppState: AppReducer,
};
export const metaReducers: MetaReducer<IAppState>[] = [];
