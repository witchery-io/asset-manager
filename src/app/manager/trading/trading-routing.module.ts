import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@trading/containers';
import { AuthGuard } from '@app/shared/services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'groups/5c586baff771351cf5a89704/positions'},
  {path: ':type/:id/:tab', component: MainComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingRoutingModule {
}
