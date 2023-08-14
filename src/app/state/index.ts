import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppReducer } from "./app.reducer";
import { IAppState } from "./app.interface";
import { SettingsReducer } from "../features/settings/store/settings.reducer";

export const reducers: ActionReducerMap<IAppState> = {
  AppState: AppReducer,
  Settings: SettingsReducer,
};
export const metaReducers: MetaReducer<IAppState>[] = [];
