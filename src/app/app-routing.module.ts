import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@app/pages/page-not-found.component';
import { ServerErrorComponent } from '@app/pages/server-error.component';

const routes: Routes = [
  { path: '', redirectTo: 'trading', pathMatch: 'full' },
  {
    path: 'trading',
    loadChildren: '@trading/trading.module#TradingModule',
  },
  {
    path: 'bots',
    loadChildren: '@bots/bots.module#BotsModule',
  },
  {
    path: 'settings',
    loadChildren: '@settings/settings.module#SettingsModule',
  },
  {
    path: 'login',
    loadChildren: '@login/login.module#LoginModule',
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
