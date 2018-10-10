import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TradingComponent } from './components/trading/trading.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'trading', redirectTo: 'trading/group1' },
  { path: 'trading/:groupId', component: TradingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
