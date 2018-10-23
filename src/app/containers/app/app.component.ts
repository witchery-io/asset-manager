import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <div class="row">
          <div class="col-12">
            <div class="wrapper" style="background: red; min-height: 100px;">
              <router-outlet></router-outlet>
            </div>
          </div>
      </div>
    </div>
  `,
})
export class AppComponent {
}
