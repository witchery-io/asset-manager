import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SettingsComponent } from './components/settings/settings.component';
import {BotsComponent} from './components/bots/bots.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'bots', component: BotsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
