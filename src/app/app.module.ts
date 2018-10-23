import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './containers/app/app.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// manage 
import { ManagerModule } from './manager/manager.module'

export const ROUTER: Routes = [
  { path: '', component: MainComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTER),
    ManagerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
