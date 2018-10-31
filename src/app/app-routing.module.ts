import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TradingComponent } from './components/trading/trading.component';
import { BotsComponent } from './components/bots/bots.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'bots', component: BotsComponent },
  { path: 'trading', redirectTo: 'trading/group/a4fc2e73-8651-4caa-be9c-064df87b9aae' },
  { path: 'trading/:type/:id', component: TradingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
