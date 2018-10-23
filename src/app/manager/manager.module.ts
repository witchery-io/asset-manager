import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const ROUTER: Routes = [
  { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' },
  { path: 'bots', loadChildren: './bots/bots.module#BotsModule' },
  { path: 'trading', loadChildren: './trading/trading.module#TradingModule' }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTER),
  ]
})
export class ManagerModule { }
