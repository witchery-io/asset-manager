import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@bots/containers';
import { AuthGuard } from '@app/shared/services/auth-guard.service';

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotsRoutingModule {
}
