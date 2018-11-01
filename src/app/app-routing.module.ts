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
      {path: 'trading', redirectTo: 'trading/account/191308ab-1331-4cbb-8c70-48164e41ce40'},
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
