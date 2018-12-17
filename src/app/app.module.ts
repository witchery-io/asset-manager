import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';

import { AppComponent } from '@app/app.component';
import { PageNotFoundComponent } from '@app/pages/page-not-found.component';
import { ServerErrorComponent } from '@app/pages/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
