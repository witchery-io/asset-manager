import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@trading/containers';
import { AuthGuard } from '@app/shared/services/auth-guard.service';
import { RoleGuard } from '@app/shared/services/role-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'accounts/5cbf1558c546b40001a5a774/positions'},
  {path: ':type/:id/:tab', component: MainComponent, canActivate: [AuthGuard, RoleGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TradingRoutingModule {
}
