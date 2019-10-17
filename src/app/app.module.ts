import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule, appRoutingProviders} from '@app/app-routing.module';
import {CoreModule} from '@app/core/core.module';
import {SharedModule} from '@app/shared/shared.module';

import {AppComponent} from '@app/app.component';
import {PageNotFoundComponent} from '@app/pages/page-not-found.component';
import {ServerErrorComponent} from '@app/pages/server-error.component';
import {NotifierModule} from 'angular-notifier';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
      },
      behaviour: {
        stacking: 8
      },
    }),
  ],
  providers: [
    appRoutingProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
