import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';
import { DashboardComponent } from './containers';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    NgxSpinnerModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
      },
    }),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
