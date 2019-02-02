import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@trading/containers';
import { AuthGuard } from '@app/shared/services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'accounts/edc23b04-64d8-4469-bb6a-40da55322d26/orders'},
  {path: ':type/:id/:tab', component: MainComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingRoutingModule {
}
