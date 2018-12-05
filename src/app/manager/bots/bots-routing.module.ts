import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BotsComponent } from '@bots/containers';

const routes: Routes = [
  {
    path: 'bots',
    data: { title: 'Bots' },
    children: [
      {
        path: '',
        component: BotsComponent,
        pathMatch: 'full',
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BotsRoutingModule { }
