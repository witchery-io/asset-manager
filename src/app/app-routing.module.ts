import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import * as components from './components';
import { DashboardComponent } from './containers';

const routes: Routes = [
  { path: '', component: components.MainComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'trading/group/6a86df61-c190-4347-9b61-34cbd88d38a4', pathMatch: 'full' },
      { path: 'trading', redirectTo: 'trading/group/6a86df61-c190-4347-9b61-34cbd88d38a4' },
      { path: 'trading/:type/:id', component: components.TradingComponent },
      { path: 'settings', component: components.SettingsComponent },
      { path: 'bots', component: components.BotsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
