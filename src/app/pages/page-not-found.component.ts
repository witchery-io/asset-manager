import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div>
      404
      <h1>Requested page not found</h1>
      <a [routerLink]="['/']">Navigate to main page</a>
    </div>
  `,
})

export class PageNotFoundComponent {
}
