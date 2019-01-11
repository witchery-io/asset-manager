import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { getGroupsFromSection } from '@app/core/reducers';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';

@Component({
  selector: 'app-groups-tab',
  templateUrl: './groups-tab.component.html',
  styleUrls: ['./groups-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsTabComponent implements OnInit {

  role = 'admin';
  faPlus = faPlus;
  faEdit = faEdit;

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
