import { createAction, props } from "@ngrx/store";
import { Settings } from "src/app/models/settings.model";

export const setSettings = createAction(
  "[Settings] set settings",
  props<{ settings: Settings }>(),
);
