import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@settings/containers';
import { AuthGuard } from '@app/shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: ':generalTab', component: MainComponent, canActivate: [AuthGuard]},
      {path: ':generalTab/:id', component: MainComponent, canActivate: [AuthGuard]},
      {path: ':generalTab/:id/:orderTab', component: MainComponent, canActivate: [AuthGuard]},
      {path: ':generalTab/:id/:subType/:subId', component: MainComponent, canActivate: [AuthGuard]},
      {path: ':generalTab/:id/:subType/:subId/:orderTab', component: MainComponent, canActivate: [AuthGuard]},
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {
}
