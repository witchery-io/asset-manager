import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet>
      Test
    </router-outlet>
  `
})
export class AppComponent {
  title = 'asset-manager';
}
