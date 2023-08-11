import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MainGameComponent } from "./features/game/components/main-game/main-game.component";
import { SettingsComponent } from "./features/settings/components/settings.component";

const routes: Routes = [
  { path: "game", redirectTo: "", pathMatch: "full" },
  { path: "", component: MainGameComponent },
  { path: "settings", component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
