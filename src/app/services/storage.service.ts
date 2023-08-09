import { Injectable } from "@angular/core";
import { IApp } from "../state/app.interface";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private readonly store: Store<IApp>) {}

  saveCache(key: string, value: string[]) {
    localStorage.setItem("minesweeper " + key, JSON.stringify(value));
  }
}
