import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {SettingsComponent} from './components/settings/settings.component';
import {TradingComponent} from './components/trading/trading.component';
import {BotsComponent} from './components/bots/bots.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {
    path: 'dashboard', component: DashboardComponent, children: [
      {path: '', redirectTo: 'settings', pathMatch: 'full'},
      {path: 'settings', component: SettingsComponent},
      {path: 'bots', component: BotsComponent},
      {path: 'trading', redirectTo: 'trading/group/6a86df61-c190-4347-9b61-34cbd88d38a4'},
      {path: 'trading/:type/:id', component: TradingComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
