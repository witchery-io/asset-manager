import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups-tab-group',
  templateUrl: './groups-tab-group.component.html',
  styleUrls: ['./groups-tab-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsTabGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
