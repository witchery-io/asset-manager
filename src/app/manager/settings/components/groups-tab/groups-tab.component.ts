import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups-tab',
  template: `
    <h1>GROUPS TAB</h1>
    <app-groups-tab-group></app-groups-tab-group>
    <app-groups-tab-account></app-groups-tab-account>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsTabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
