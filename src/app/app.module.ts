import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './pages/page-not-found.component';
import { ServerErrorComponent } from './pages/server-error.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
