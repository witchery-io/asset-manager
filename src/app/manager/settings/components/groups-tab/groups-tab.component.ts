import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getGroupsFromSection } from '@app/core/reducers';

@Component({
  selector: 'app-groups-tab',
  template: `
    <h1>Group tab</h1>
    <app-groups-tab-group></app-groups-tab-group>
    <app-groups-tab-account></app-groups-tab-account>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsTabComponent implements OnInit {

  @Input()
  section: any;

  constructor() {
  }

  get groups() {
    return getGroupsFromSection(this.section);
  }

  ngOnInit() {
  }
}
