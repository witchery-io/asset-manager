import { NgModule } from '@angular/core';
import * as components from './components';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'not-found', component: components.NotFoundComponent },
];

@NgModule({
  imports: [
    [RouterModule.forRoot(routes)],
  ],
  declarations: [
    components.NotFoundComponent,
    components.TvChartComponent,
  ],
  exports: [
    components.TvChartComponent,
  ],
})
export class SharedModule { }
