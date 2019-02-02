import { Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  template: `
    <div>
      500
      <h1>Internal Server Error</h1>
      <a [routerLink]="['/']">Navigate to main page</a>
    </div>
  `,
})

export class ServerErrorComponent {
}
