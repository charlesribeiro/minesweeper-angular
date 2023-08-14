import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorComponent } from "./containers/error/error.component";
import { LoaderComponent } from "./containers/loader/loader.component";
import { HeaderComponent } from "./containers/header/header.component";
import { RouterModule } from "@angular/router";
import { PageWrapperComponent } from "./containers/page-wrapper/page-wrapper.component";

@NgModule({
  declarations: [
    ErrorComponent,
    LoaderComponent,
    HeaderComponent,
    PageWrapperComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    ErrorComponent,
    LoaderComponent,
    HeaderComponent,
    PageWrapperComponent,
  ],
})
export class SharedModule {}
