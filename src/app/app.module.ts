import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { AppEffects } from "../app/state/app.effects";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { NgModule, isDevMode } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MainGameComponent } from "./features/game/components/main-game/main-game.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers } from "../app/state";
import { CellComponent } from "./features/game/containers/cell/cell.component";
import { StorageService } from "./services/storage.service";
import { SettingsComponent } from "./features/settings/components/settings.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./features/shared/header/header.component";
import { TimerService } from "./services/timer.service";
import { SevenSegmentDisplayComponent } from "./features/game/containers/seven-segment/seven-segment-display.component";
import { ResetButtonComponent } from "./features/game/containers/reset-button/reset-button.component";
import { SaveAndLoadComponent } from "./features/save-and-load/components/save-and-load/save-and-load.component";
import { BoardComponent } from "./features/game/containers/board/board.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainGameComponent,
    CellComponent,
    SettingsComponent,
    MainGameComponent,
    CellComponent,
    SevenSegmentDisplayComponent,
    ResetButtonComponent,
    SaveAndLoadComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EffectsModule.forRoot([AppEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [StorageService, TimerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
