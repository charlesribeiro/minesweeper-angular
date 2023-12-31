import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { AppEffects } from "../app/state/app.effects";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { NgModule, isDevMode } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../app/state";
import { StorageService } from "./services/storage.service";
import { SettingsComponent } from "./features/settings/components/settings.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TimerService } from "./services/timer.service";
import { SaveAndLoadComponent } from "./features/save-and-load/components/save-and-load/save-and-load.component";
import { GameModule } from "./features/game/game.module";
import { SharedModule } from "./features/shared/shared.module";
import { SettingsEffects } from "./features/settings/store/settings.effects";

@NgModule({
  declarations: [AppComponent, SettingsComponent, SaveAndLoadComponent],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EffectsModule.forRoot([SettingsEffects, AppEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    GameModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [StorageService, TimerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
