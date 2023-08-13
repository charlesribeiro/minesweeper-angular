import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainGameComponent } from "./features/game/components/main-game/main-game.component";
import { SettingsComponent } from "./features/settings/components/settings.component";
import { SaveAndLoadComponent } from "./features/save-and-load/components/save-and-load/save-and-load.component";

const routes: Routes = [
  { path: "", redirectTo: "settings", pathMatch: "full" },
  { path: "game", component: MainGameComponent },
  { path: "settings", component: SettingsComponent },
  { path: "save-load", component: SaveAndLoadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
