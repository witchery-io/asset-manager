import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div class="row">
      <div class="col-2">
        <a href="/trading" target="_blank" class="btn btn-primary btn-block">Trading</a>
        <a href="/settings" target="_blank" class="btn btn-primary btn-block">Settings</a>
        <a href="/bots" target="_blank" class="btn btn-primary btn-block">Bots</a>
      </div>
    </div>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
