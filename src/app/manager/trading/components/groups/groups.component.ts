import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getGroupsFromSection } from '@app/core/reducers';

@Component({
  selector: 'app-groups',
  template: `
    <h1>Groups</h1>
    <app-group
      *ngFor="let group of groups"
      [group]="group"
    ></app-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {

  @Input()
  section: any;

  constructor() {}

  ngOnInit() {
    console.log(this);
  }

  get groups() {
    return getGroupsFromSection(this.section);
  }
}
