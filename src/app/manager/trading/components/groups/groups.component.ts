import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getGroupsFromSection } from '@app/core/reducers';

@Component({
  selector: 'app-groups',
  template: `
    <div class="select-wrapper">
      <select>
        <option> -- Select Group -- </option>
        <option *ngFor="let group of groups" [value]="group.id">{{ group.name }}</option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent implements OnInit {

  @Input()
  section: any;

  constructor() {
  }

  ngOnInit() {
  }

  get groups() {
    return getGroupsFromSection(this.section);
  }


}
