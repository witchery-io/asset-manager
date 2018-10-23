import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <div class="row">
          <div class="col-12">
            <div class="wrapper">
              <router-outlet></router-outlet>
            </div>
          </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
}
